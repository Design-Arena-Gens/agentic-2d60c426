'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

interface NeuralNetworkSceneProps {
  params: {
    learningRate: number
    layers: number
    neurons: number
    activation: string
    epochs: number
  }
}

function Neuron({ position, color, activated }: { position: [number, number, number], color: string, activated: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (activated && meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2)
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={activated ? 0.5 : 0.1}
      />
    </Sphere>
  )
}

function Connection({ start, end, weight }: { start: [number, number, number], end: [number, number, number], weight: number }) {
  const opacity = Math.abs(weight)
  const color = weight > 0 ? '#60a5fa' : '#f87171'

  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={2}
      transparent
      opacity={opacity * 0.6}
    />
  )
}

function NetworkVisualization({ params }: NeuralNetworkSceneProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const network = useMemo(() => {
    const layers = []
    const spacing = 4
    const startX = -((params.layers - 1) * spacing) / 2

    for (let l = 0; l < params.layers; l++) {
      const layer = []
      const x = startX + l * spacing
      const neuronCount = l === 0 || l === params.layers - 1 ? Math.max(3, Math.floor(params.neurons * 0.6)) : params.neurons
      const startY = -((neuronCount - 1) * 1.2) / 2

      for (let n = 0; n < neuronCount; n++) {
        const y = startY + n * 1.2
        layer.push({
          position: [x, y, 0] as [number, number, number],
          activated: Math.random() > 0.5
        })
      }
      layers.push(layer)
    }
    return layers
  }, [params.layers, params.neurons])

  const connections = useMemo(() => {
    const conns = []
    for (let l = 0; l < network.length - 1; l++) {
      for (let i = 0; i < network[l].length; i++) {
        for (let j = 0; j < network[l + 1].length; j++) {
          conns.push({
            start: network[l][i].position,
            end: network[l + 1][j].position,
            weight: (Math.random() - 0.5) * 2 * params.learningRate * 100
          })
        }
      }
    }
    return conns
  }, [network, params.learningRate])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const getLayerColor = (layerIndex: number) => {
    if (layerIndex === 0) return '#10b981' // green - input
    if (layerIndex === network.length - 1) return '#ef4444' // red - output
    return '#8b5cf6' // purple - hidden
  }

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((conn, idx) => (
        <Connection key={`conn-${idx}`} {...conn} />
      ))}

      {/* Neurons */}
      {network.map((layer, layerIdx) => (
        <group key={`layer-${layerIdx}`}>
          {layer.map((neuron, neuronIdx) => (
            <Neuron
              key={`neuron-${layerIdx}-${neuronIdx}`}
              position={neuron.position}
              color={getLayerColor(layerIdx)}
              activated={neuron.activated}
            />
          ))}

          {/* Layer Labels */}
          <Text
            position={[network[layerIdx][0].position[0], network[layerIdx][network[layerIdx].length - 1].position[1] + 1.5, 0]}
            fontSize={0.4}
            color="#9ca3af"
            anchorX="center"
          >
            {layerIdx === 0 ? 'Input' : layerIdx === network.length - 1 ? 'Output' : `Hidden ${layerIdx}`}
          </Text>
        </group>
      ))}

      {/* Activation Function Label */}
      <Text
        position={[0, -6, 0]}
        fontSize={0.5}
        color="#a78bfa"
        anchorX="center"
      >
        Activation: {params.activation.toUpperCase()}
      </Text>
    </group>
  )
}

export default function NeuralNetworkScene({ params }: NeuralNetworkSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <NetworkVisualization params={params} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={30}
      />
    </Canvas>
  )
}
