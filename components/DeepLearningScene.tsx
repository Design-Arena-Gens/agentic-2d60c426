'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box } from '@react-three/drei'
import * as THREE from 'three'

interface DeepLearningSceneProps {
  params: {
    learningRate: number
    layers: number
    neurons: number
    activation: string
    epochs: number
  }
}

function ConvLayer({ position, size, color, label }: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  label: string
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      <Box ref={meshRef} args={size}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Box>
      <Text
        position={[0, size[1] / 2 + 0.8, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  )
}

function FeatureMap({ position, count }: { position: [number, number, number], count: number }) {
  const maps = useMemo(() => {
    const result = []
    const spacing = 0.3
    for (let i = 0; i < Math.min(count, 8); i++) {
      result.push({
        position: [position[0], position[1], position[2] + i * spacing] as [number, number, number]
      })
    }
    return result
  }, [count, position])

  return (
    <group>
      {maps.map((map, idx) => (
        <Box key={idx} args={[2, 2, 0.1]} position={map.position}>
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.6 - idx * 0.05}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </Box>
      ))}
    </group>
  )
}

function DataFlow({ params }: DeepLearningSceneProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const layers = useMemo(() => {
    const layerCount = params.layers
    const spacing = 5
    const startX = -((layerCount - 1) * spacing) / 2

    return [
      { position: [startX, 0, 0] as [number, number, number], size: [3, 3, 0.2] as [number, number, number], color: '#10b981', label: 'Input Image' },
      ...Array.from({ length: layerCount - 2 }, (_, i) => ({
        position: [startX + (i + 1) * spacing, 0, 0] as [number, number, number],
        size: [2.5 - i * 0.2, 2.5 - i * 0.2, 0.3 + i * 0.1] as [number, number, number],
        color: '#8b5cf6',
        label: `Conv ${i + 1}`
      })),
      { position: [startX + (layerCount - 1) * spacing, 0, 0] as [number, number, number], size: [1.5, 1.5, 0.5] as [number, number, number], color: '#ef4444', label: 'Output' }
    ]
  }, [params.layers])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {layers.map((layer, idx) => (
        <ConvLayer key={idx} {...layer} />
      ))}

      {/* Connection lines */}
      {layers.slice(0, -1).map((layer, idx) => {
        const nextLayer = layers[idx + 1]
        const points = [
          new THREE.Vector3(layer.position[0] + layer.size[0] / 2, 0, 0),
          new THREE.Vector3(nextLayer.position[0] - nextLayer.size[0] / 2, 0, 0)
        ]
        return (
          <line key={`line-${idx}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" linewidth={2} />
          </line>
        )
      })}

      <Text
        position={[0, -4, 0]}
        fontSize={0.5}
        color="#a78bfa"
        anchorX="center"
      >
        Convolutional Neural Network (CNN)
      </Text>
    </group>
  )
}

export default function DeepLearningScene({ params }: DeepLearningSceneProps) {
  return (
    <Canvas camera={{ position: [0, 2, 15], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 10, 5]} intensity={0.8} color="#8b5cf6" />

      <DataFlow params={params} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={30}
      />
    </Canvas>
  )
}
