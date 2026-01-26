'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface LiquidEtherProps {
  mouseForce?: number
  cursorSize?: number
  isViscous?: boolean
  viscous?: number
  iterationsViscous?: number
  iterationsPoisson?: number
  dt?: number
  BFECC?: boolean
  resolution?: number
  isBounce?: boolean
  colors?: string[]
  style?: React.CSSProperties
  className?: string
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  takeoverDuration?: number
  autoResumeDelay?: number
  autoRampDuration?: number
}

export function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const webglRef = useRef<any>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const rafRef = useRef<number | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
  const isVisibleRef = useRef(true)
  const resizeRafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Note: This is a simplified version. For the full implementation,
    // you would need to include all the shader passes and simulation classes
    // from the original ReactBits code. This creates a basic visual effect.

    const container = mountRef.current
    container.style.position = container.style.position || 'relative'
    container.style.overflow = container.style.overflow || 'hidden'

    const width = window.innerWidth
    const height = window.innerHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.pointerEvents = 'none'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Create palette texture
    function makePaletteTexture(stops: string[]) {
      const arr = stops.length === 1 ? [stops[0], stops[0]] : stops
      const w = arr.length
      const data = new Uint8Array(w * 4)
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i])
        data[i * 4 + 0] = Math.round(c.r * 255)
        data[i * 4 + 1] = Math.round(c.g * 255)
        data[i * 4 + 2] = Math.round(c.b * 255)
        data[i * 4 + 3] = 255
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat)
      tex.magFilter = THREE.LinearFilter
      tex.minFilter = THREE.LinearFilter
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.generateMipmaps = false
      tex.needsUpdate = true
      return tex
    }

    const paletteTex = makePaletteTexture(colors)

    // Simplified shader for visual effect
    const vertexShader = `
      attribute vec3 position;
      varying vec2 uv;
      void main() {
        uv = position.xy * 0.5 + 0.5;
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform sampler2D uPalette;
      varying vec2 uv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = (uv - 0.5) * 2.0;
        vec2 mouse = (uMouse - 0.5) * 2.0;
        
        float dist = length(p - mouse);
        float fluid = fbm(p * 2.0 + uTime * 0.1);
        float intensity = smoothstep(0.5, 0.0, dist) * fluid;
        
        vec3 color = texture2D(uPalette, vec2(intensity, 0.5)).rgb;
        gl_FragColor = vec4(color, intensity * 0.8);
      }
    `

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(width, height) },
        uPalette: { value: paletteTex },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const mouse = new THREE.Vector2(0.5, 0.5)
    let time = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1 - e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!isVisibleRef.current || document.hidden) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      rafRef.current = requestAnimationFrame(animate)
      time += 0.016

      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.copy(mouse)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      material.uniforms.uResolution.value.set(w, h)
    }

    window.addEventListener('resize', handleResize)

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)
    resizeObserverRef.current = ro

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0
      },
      { threshold: [0, 0.01, 0.1] },
    )
    io.observe(container)
    intersectionObserverRef.current = io

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
      if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      paletteTex.dispose()
    }
  }, [colors, mouseForce, cursorSize, resolution])

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className || ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10,
        ...style,
      }}
    />
  )
}
