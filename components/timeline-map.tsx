'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { Map as LeafletMap, Marker, Polyline } from 'leaflet'
import type { TimelineStop } from '@/data/timeline'
import 'leaflet/dist/leaflet.css'

interface TimelineMapProps {
  stops: TimelineStop[]
  activeIndex: number
}

export interface TimelineMapHandle {
  zoomIn: () => void
  zoomOut: () => void
}

function createMarkerIcon (L: typeof import('leaflet'), label: number, isActive: boolean) {
  const size = isActive ? 36 : 28
  return L.divIcon({
    className: 'timeline-marker',
    html: `<span class="timeline-marker-dot${isActive ? ' is-active' : ''}">${label}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function flyToStop (map: LeafletMap, stop: TimelineStop, preferLeft: boolean) {
  const zoom = stop.zoom
  const target = map.project(stop.coords, zoom)
  if (preferLeft) {
    const size = map.getSize()
    target.x += size.x * 0.18
  }
  map.flyTo(map.unproject(target, zoom), zoom, {
    animate: true,
    duration: 1.15,
  })
}

export const TimelineMap = forwardRef<TimelineMapHandle, TimelineMapProps>(
  function TimelineMap ({ stops, activeIndex }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<LeafletMap | null>(null)
    const markersRef = useRef<Marker[]>([])
    const routeRef = useRef<Polyline | null>(null)
    const activeIndexRef = useRef(activeIndex)

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
      if (!containerRef.current || mapRef.current) return

      let cancelled = false

      async function initMap () {
        const L = await import('leaflet')
        if (cancelled || !containerRef.current) return

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
            icon: createMarkerIcon(L, stop.index, index === activeIndexRef.current),
            interactive: false,
          }).addTo(map)
          return marker
        })

        mapRef.current = map
        markersRef.current = markers
        routeRef.current = route

        const preferLeft = window.matchMedia('(min-width: 1024px)').matches
        flyToStop(map, stops[activeIndexRef.current] ?? first, preferLeft)

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
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
      }
    }, [stops])

    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      let cancelled = false

      async function updateActive () {
        const L = await import('leaflet')
        if (cancelled || !mapRef.current) return

        markersRef.current.forEach((marker, index) => {
          const stop = stops[index]
          if (!stop) return
          marker.setIcon(createMarkerIcon(L, stop.index, index === activeIndex))
        })

        const stop = stops[activeIndex]
        if (!stop) return
        const preferLeft = window.matchMedia('(min-width: 1024px)').matches
        flyToStop(mapRef.current, stop, preferLeft)
      }

      void updateActive()

      return () => {
        cancelled = true
      }
    }, [activeIndex, stops])

    return (
      <div ref={containerRef} className="timeline-map h-full w-full" aria-hidden />
    )
  },
)
