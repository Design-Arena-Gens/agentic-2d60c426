'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

interface MLAlgorithmSceneProps {
  params: {
    learningRate: number
    layers: number
    neurons: number
    activation: string
    epochs: number
  }
}

function DataPoint({ position, color, label }: {
  position: [number, number, number]
  color: string
  label: string
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.15, 16, 16]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </Sphere>
  )
}

function DecisionBoundary({ params }: MLAlgorithmSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 4]}>
      <planeGeometry args={[10, 0.1, 1, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.5}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function MLVisualization({ params }: MLAlgorithmSceneProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const dataPoints = useMemo(() => {
    const points = []
    const count = params.neurons * 5

    // Class 1 (blue)
    for (let i = 0; i < count; i++) {
      points.push({
        position: [
          Math.random() * 4 - 3,
          Math.random() * 4 - 3,
          Math.random() * 2 - 1
        ] as [number, number, number],
        color: '#3b82f6',
        label: 'Class A'
      })
    }

    // Class 2 (red)
    for (let i = 0; i < count; i++) {
      points.push({
        position: [
          Math.random() * 4 + 1,
          Math.random() * 4 + 1,
          Math.random() * 2 - 1
        ] as [number, number, number],
        color: '#ef4444',
        label: 'Class B'
      })
    }

    return points
  }, [params.neurons])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Decision Boundary */}
      <DecisionBoundary params={params} />

      {/* Data Points */}
      {dataPoints.map((point, idx) => (
        <DataPoint key={idx} {...point} />
      ))}

      {/* Axes */}
      <Line points={[[-5, 0, 0], [5, 0, 0]]} color="#4b5563" lineWidth={1} />
      <Line points={[[0, -5, 0], [0, 5, 0]]} color="#4b5563" lineWidth={1} />

      {/* Labels */}
      <Text position={[-4, -4.5, 0]} fontSize={0.4} color="#3b82f6">Class A</Text>
      <Text position={[3, 4.5, 0]} fontSize={0.4} color="#ef4444">Class B</Text>

      <Text
        position={[0, -6, 0]}
        fontSize={0.5}
        color="#a78bfa"
        anchorX="center"
      >
        Classification Algorithm
      </Text>

      <Text
        position={[0, -6.8, 0]}
        fontSize={0.3}
        color="#9ca3af"
        anchorX="center"
      >
        Learning Rate: {params.learningRate.toFixed(3)} | Epochs: {params.epochs}
      </Text>
    </group>
  )
}

export default function MLAlgorithmScene({ params }: MLAlgorithmSceneProps) {
  return (
    <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#8b5cf6" />

      <MLVisualization params={params} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={25}
      />

      {/* Grid helper */}
      <gridHelper args={[20, 20, '#374151', '#1f2937']} position={[0, -5, 0]} />
    </Canvas>
  )
}
