'use client'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import type { Map as LeafletMap, Marker, Polyline } from 'leaflet'
import type { TimelineStop } from '@/data/timeline'
import 'leaflet/dist/leaflet.css'

interface TimelineMapProps {
  stops: TimelineStop[]
  activeIndex: number
  onSelectStop?: (index: number) => void
}

export interface TimelineMapHandle {
  zoomIn: () => void
  zoomOut: () => void
}

function createMarkerIcon (
  L: typeof import('leaflet'),
  label: number,
  isActive: boolean,
) {
  const isNarrow =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 1023px)').matches
  const size = isActive ? 40 : isNarrow ? 36 : 32
  return L.divIcon({
    className: 'timeline-marker',
    html: `<span class="timeline-marker-dot${isActive ? ' is-active' : ''}">${label}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function moveToStop (
  map: LeafletMap,
  stop: TimelineStop,
  preferLeft: boolean,
  animate: boolean,
) {
  const zoom = stop.zoom
  const target = map.project(stop.coords, zoom)
  if (preferLeft) {
    const size = map.getSize()
    target.x += size.x * 0.18
  }
  const next = map.unproject(target, zoom)

  if (!animate) {
    map.setView(next, zoom, { animate: false })
    return
  }

  map.flyTo(next, zoom, {
    animate: true,
    duration: 1.7,
    easeLinearity: 0.2,
  })
}

export const TimelineMap = forwardRef<TimelineMapHandle, TimelineMapProps>(
  function TimelineMap ({ stops, activeIndex, onSelectStop }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<LeafletMap | null>(null)
    const markersRef = useRef<Marker[]>([])
    const routeRef = useRef<Polyline | null>(null)
    const leafletRef = useRef<typeof import('leaflet') | null>(null)
    const activeIndexRef = useRef(activeIndex)
    const onSelectStopRef = useRef(onSelectStop)

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        mapRef.current?.zoomIn(1)
      },
      zoomOut: () => {
        mapRef.current?.zoomOut(1)
      },
    }))

    useEffect(() => {
      activeIndexRef.current = activeIndex
    }, [activeIndex])

    useEffect(() => {
      onSelectStopRef.current = onSelectStop
    }, [onSelectStop])

    useEffect(() => {
      if (!containerRef.current || mapRef.current) return

      let cancelled = false

      async function initMap () {
        const L = await import('leaflet')
        if (cancelled || !containerRef.current) return

        leafletRef.current = L

        const first = stops[0]
        if (!first) return

        const map = L.map(containerRef.current, {
          zoomControl: false,
          attributionControl: true,
          scrollWheelZoom: false,
          dragging: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
          touchZoom: false,
          minZoom: 2,
          maxZoom: 19,
        }).setView(first.coords, first.zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          subdomains: 'abc',
          maxZoom: 19,
          className: 'timeline-map-tiles',
        }).addTo(map)

        const route = L.polyline(
          stops.map((stop) => stop.coords),
          {
            color: 'rgba(52, 211, 153, 0.45)',
            weight: 2,
            dashArray: '6 10',
            lineCap: 'round',
            lineJoin: 'round',
          },
        ).addTo(map)

        const markers = stops.map((stop, index) => {
          const marker = L.marker(stop.coords, {
            icon: createMarkerIcon(
              L,
              stop.index,
              index === activeIndexRef.current,
            ),
            interactive: true,
          }).addTo(map)

          marker.on('click', () => {
            onSelectStopRef.current?.(index)
          })

          return marker
        })

        mapRef.current = map
        markersRef.current = markers
        routeRef.current = route

        const preferLeft = window.matchMedia('(min-width: 1024px)').matches
        const current = stops[activeIndexRef.current] ?? first
        moveToStop(map, current, preferLeft, false)

        const handleResize = () => {
          map.invalidateSize()
        }

        window.addEventListener('resize', handleResize)
        requestAnimationFrame(() => {
          map.invalidateSize()
        })

        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }

      let cleanupResize: (() => void) | undefined

      void initMap().then((cleanup) => {
        cleanupResize = cleanup
      })

      return () => {
        cancelled = true
        cleanupResize?.()
        routeRef.current = null
        markersRef.current = []
        leafletRef.current = null
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
      }
    }, [stops])

    useEffect(() => {
      const map = mapRef.current
      const L = leafletRef.current
      if (!map || !L) return

      markersRef.current.forEach((marker, index) => {
        const stop = stops[index]
        if (!stop) return
        marker.setIcon(createMarkerIcon(L, stop.index, index === activeIndex))
      })

      const stop = stops[activeIndex]
      if (!stop) return

      const preferLeft = window.matchMedia('(min-width: 1024px)').matches
      moveToStop(map, stop, preferLeft, true)
    }, [activeIndex, stops])

    return <div ref={containerRef} className="timeline-map h-full w-full" />
  },
)
