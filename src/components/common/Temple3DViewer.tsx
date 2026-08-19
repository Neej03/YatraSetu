import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../context/SimulationContext';
import { TempleId } from '../../types';
import { 
  Eye, Sun, Moon, Maximize2, Compass, Layers, Zap, AlertTriangle, ShieldCheck, 
  RotateCcw, Sparkles, Navigation, Info, ChevronRight, Volume2, CheckCircle2, Waves, Mountain, Landmark
} from 'lucide-react';

interface ZoneTelemetry3D {
  id: string;
  name: string;
  crowdCount: number;
  capacity: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  waitTime: number;
  pos: [number, number, number];
  color: string;
}

export const Temple3DViewer: React.FC<{ heightClass?: string }> = ({ heightClass = "h-[580px]" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { selectedTempleId, temples, zones, t } = useSimulation();
  
  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [activeViewpoint, setActiveViewpoint] = useState<'aerial' | 'sanctum' | 'entrance' | 'cctv'>('sanctum');
  const [selectedZone, setSelectedZone] = useState<ZoneTelemetry3D | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);

  // Dynamic Telemetry Zones mapped per temple
  const getTemple3dZones = (templeId: TempleId): ZoneTelemetry3D[] => {
    switch (templeId) {
      case 'dwarka':
        return [
          { id: 'z1', name: 'Gomti Riverfront Ghat Steps', crowdCount: 420, capacity: 1500, riskLevel: 'low', waitTime: 5, pos: [-14, 0.5, 12], color: '#06b6d4' },
          { id: 'z2', name: 'Swarga Dvar (Gate to Heaven) Entrance', crowdCount: 890, capacity: 1200, riskLevel: 'moderate', waitTime: 22, pos: [0, 0.5, 18], color: '#f59e0b' },
          { id: 'z3', name: 'Jagat Mandir 5-Tier Sanctum Queue', crowdCount: 1180, capacity: 1200, riskLevel: 'critical', waitTime: 45, pos: [0, 0.5, -4], color: '#f43f5e' },
          { id: 'z4', name: 'Moksha Dvar Exit Corridor', crowdCount: 310, capacity: 1000, riskLevel: 'low', waitTime: 4, pos: [14, 0.5, 6], color: '#10b981' }
        ];
      case 'ambaji':
        return [
          { id: 'z1', name: 'Gabbar Hill Ropeway Terminal Approach', crowdCount: 360, capacity: 1000, riskLevel: 'low', waitTime: 8, pos: [-12, 0.5, 14], color: '#10b981' },
          { id: 'z2', name: 'White Marble Courtyard Concourse', crowdCount: 710, capacity: 1200, riskLevel: 'moderate', waitTime: 18, pos: [0, 0.5, 16], color: '#f59e0b' },
          { id: 'z3', name: 'Holy Vishtra Yantra Golden Sanctum', crowdCount: 1150, capacity: 1200, riskLevel: 'high', waitTime: 38, pos: [0, 0.5, -4], color: '#f43f5e' },
          { id: 'z4', name: 'Chachar Chowk Exit Plaza', crowdCount: 220, capacity: 1500, riskLevel: 'low', waitTime: 2, pos: [14, 0.5, 8], color: '#06b6d4' }
        ];
      case 'pavagadh':
        return [
          { id: 'z1', name: 'Mountain Ropeway Station Exit', crowdCount: 520, capacity: 1200, riskLevel: 'moderate', waitTime: 15, pos: [-14, 0.5, 10], color: '#f59e0b' },
          { id: 'z2', name: 'Cliffside Staircase Pathway Queue', crowdCount: 980, capacity: 1100, riskLevel: 'high', waitTime: 35, pos: [0, 0.5, 16], color: '#f43f5e' },
          { id: 'z3', name: 'Mahakali Cliff Sanctum (Summit)', crowdCount: 890, capacity: 900, riskLevel: 'critical', waitTime: 50, pos: [0, 0.5, -4], color: '#e11d48' },
          { id: 'z4', name: 'Champaner Fort Viewpoint Concourse', crowdCount: 240, capacity: 1000, riskLevel: 'low', waitTime: 3, pos: [14, 0.5, 6], color: '#10b981' }
        ];
      default: // Somnath
        return [
          { id: 'z1', name: 'Zone A - East Queue Canopy Corridor', crowdCount: 340, capacity: 1000, riskLevel: 'low', waitTime: 8, pos: [-12, 0.5, 8], color: '#10b981' },
          { id: 'z2', name: 'Zone B - Main Gopuram Gate Entrance', crowdCount: 780, capacity: 1200, riskLevel: 'moderate', waitTime: 18, pos: [0, 0.5, 18], color: '#f59e0b' },
          { id: 'z3', name: 'Zone C - Garbhagriha Sanctum Queue', crowdCount: 1140, capacity: 1200, riskLevel: 'critical', waitTime: 35, pos: [0, 0.5, -4], color: '#f43f5e' },
          { id: 'z4', name: 'Zone D - Ocean Promenade Exit Plaza', crowdCount: 220, capacity: 1500, riskLevel: 'low', waitTime: 2, pos: [12, 0.5, 6], color: '#06b6d4' }
        ];
    }
  };

  const currentZone3DData = getTemple3dZones(selectedTempleId);

  // Ref to hold Three.js references across renders
  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    flagMesh?: THREE.Mesh;
    waterMesh?: THREE.Mesh;
    heatRings: THREE.Mesh[];
    crowdParticles: THREE.Points;
    sunLight: THREE.DirectionalLight;
    ambientLight: THREE.AmbientLight;
    spotLights: THREE.SpotLight[];
    templeGroup: THREE.Group;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    rotationTarget: { x: number; y: number };
    cameraTargetPos: THREE.Vector3;
    cameraLookAtTarget: THREE.Vector3;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene & Environment Setup based on Temple Location
    const scene = new THREE.Scene();
    
    let skyBgColor = '#0b1329';
    let fogColor = '#0b1329';

    if (selectedTempleId === 'pavagadh') {
      skyBgColor = lightingMode === 'day' ? '#1e293b' : '#020617';
      fogColor = skyBgColor;
    } else if (selectedTempleId === 'dwarka') {
      skyBgColor = lightingMode === 'day' ? '#0f172a' : '#030712';
      fogColor = skyBgColor;
    } else if (selectedTempleId === 'ambaji') {
      skyBgColor = lightingMode === 'day' ? '#0f172a' : '#020617';
      fogColor = skyBgColor;
    } else { // Somnath
      skyBgColor = lightingMode === 'day' ? '#0b1329' : '#030712';
      fogColor = skyBgColor;
    }

    scene.background = new THREE.Color(skyBgColor);
    scene.fog = new THREE.FogExp2(fogColor, selectedTempleId === 'pavagadh' ? 0.02 : 0.015);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 30);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear previous canvas
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      lightingMode === 'day' ? 0xfff5ea : 0x1e293b,
      lightingMode === 'day' ? 1.4 : 0.4
    );
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(
      lightingMode === 'day' ? 0xfff7ed : 0x38bdf8,
      lightingMode === 'day' ? 2.3 : 0.5
    );
    sunLight.position.set(25, 45, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    scene.add(sunLight);

    // Spotlights for Aarti Night Mode
    const spotLights: THREE.SpotLight[] = [];
    const spotLightPositions: [number, number, number][] = [
      [0, 1, 16],
      [-12, 1, -4],
      [12, 1, -4],
      [0, 1, -14]
    ];

    spotLightPositions.forEach((pos) => {
      const spot = new THREE.SpotLight(0xf59e0b, lightingMode === 'night' ? 4.5 : 0, 45, Math.PI / 4, 0.5, 1);
      spot.position.set(...pos);
      spot.target.position.set(0, 6, 0);
      scene.add(spot);
      scene.add(spot.target);
      spotLights.push(spot);
    });

    // 5. BUILD DYNAMIC AUTHENTIC 3D TEMPLE ARCHITECTURE GROUP
    const templeGroup = new THREE.Group();
    let flagMeshRef: THREE.Mesh | undefined;
    let waterMeshRef: THREE.Mesh | undefined;

    // --- TEMPLE ARCHITECTURE FACTORY MATCHING REAL LIFE ---
    if (selectedTempleId === 'dwarka') {
      // ==========================================
      // 🛕 DWARKADHISH TEMPLE (JAGAT MANDIR 5-TIERED LIMESTONE & 52-YARD FLAG)
      // ==========================================
      
      const limestoneMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5, metalness: 0.05 });
      const darkStoneMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 });
      const riverMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, transparent: true, opacity: 0.85 });

      // Plinth & Swarga Dvar Base
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(32, 1.4, 36), darkStoneMat);
      plinth.position.y = 0.7;
      templeGroup.add(plinth);

      // Jagat Mandir 5-Tiered 170ft Limestone Spire
      const sanctumBase = new THREE.Mesh(new THREE.BoxGeometry(11, 7, 11), limestoneMat);
      sanctumBase.position.set(0, 4.9, -4);
      templeGroup.add(sanctumBase);

      // 72 Carved Pillar Motif Tiers
      for (let i = 0; i < 7; i++) {
        const scale = 1 - (i * 0.12);
        const tier = new THREE.Mesh(new THREE.BoxGeometry(10.5 * scale, 1.5, 10.5 * scale), i % 2 === 0 ? limestoneMat : darkStoneMat);
        tier.position.set(0, 8.5 + (i * 1.4), -4);
        templeGroup.add(tier);
      }

      // Kalash Finial
      const kalash = new THREE.Mesh(new THREE.ConeGeometry(1.3, 2.4, 12), goldMat);
      kalash.position.set(0, 19.4, -4);
      templeGroup.add(kalash);

      // Famous 52-Yard Saffron & Sun Dhvajaji Flag
      const flagStaff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.2), goldMat);
      flagStaff.position.set(0, 21.6, -4);
      templeGroup.add(flagStaff);

      const flagGeo = new THREE.PlaneGeometry(3.2, 1.6, 10, 4);
      const flagMat = new THREE.MeshStandardMaterial({ color: 0xea580c, side: THREE.DoubleSide, roughness: 0.3 });
      const flagMesh = new THREE.Mesh(flagGeo, flagMat);
      flagMesh.position.set(1.6, 22.8, -4);
      templeGroup.add(flagMesh);
      flagMeshRef = flagMesh;

      // Swarga Dvar (Gate to Heaven) Entrance Archway
      const gateArch = new THREE.Mesh(new THREE.BoxGeometry(8, 5.5, 4), limestoneMat);
      gateArch.position.set(0, 4.2, 17.5);
      templeGroup.add(gateArch);

      // Gomti Riverfront Water & Ghat Steps
      const riverPlane = new THREE.Mesh(new THREE.PlaneGeometry(160, 32), riverMat);
      riverPlane.rotation.x = -Math.PI / 2;
      riverPlane.position.set(0, 0.05, 32);
      templeGroup.add(riverPlane);
      waterMeshRef = riverPlane;

    } else if (selectedTempleId === 'ambaji') {
      // ==========================================
      // 🛕 AMBAJI TEMPLE (WHITE MARBLE, GOLD KALASH & GABBAR HILL ROPEWAY)
      // ==========================================

      const whiteMarbleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2, metalness: 0.1 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.15, emissive: 0xca8a04, emissiveIntensity: 0.3 });
      const hillMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.95 });

      // Plinth
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(30, 1.2, 34), whiteMarbleMat);
      plinth.position.y = 0.6;
      templeGroup.add(plinth);

      // White Marble Mandapa & Main Spire
      const sanctum = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 10), whiteMarbleMat);
      sanctum.position.set(0, 4.8, -4);
      templeGroup.add(sanctum);

      for (let i = 0; i < 6; i++) {
        const scale = 1 - (i * 0.13);
        const tier = new THREE.Mesh(new THREE.BoxGeometry(9.5 * scale, 1.4, 9.5 * scale), whiteMarbleMat);
        tier.position.set(0, 7.8 + (i * 1.3), -4);
        templeGroup.add(tier);
      }

      // Pure Gold Kalash (358 Golden Kalash Placed at Ambaji)
      const kalash = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.5, 12), goldMat);
      kalash.position.set(0, 16.8, -4);
      templeGroup.add(kalash);

      // Glowing Divine Viso Yantra Inner Sanctum Chamber (No Idol, Only Sacred Yantra)
      const yantraGlow = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.5, 2.5), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      yantraGlow.position.set(0, 3.8, 0.5);
      templeGroup.add(yantraGlow);

      // Gabbar Hill Mountain Backing & Cable Car Ropeway Towers
      const hill = new THREE.Mesh(new THREE.ConeGeometry(30, 26, 6), hillMat);
      hill.position.set(-25, 13, -25);
      templeGroup.add(hill);

      // Cable Car Tower Pillars
      const towerPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 16), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      towerPillar.position.set(-18, 8, 5);
      templeGroup.add(towerPillar);

    } else if (selectedTempleId === 'pavagadh') {
      // ==========================================
      // ⛰️ MAHAKALI TEMPLE PAVAGADH (CLIFFTOP PEAK FORTRESS & ROPEWAY)
      // ==========================================

      const cliffRockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.95 });
      const redShrineMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 });
      const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });

      // Steep Pavagadh Volcanic Rock Cliff Base
      const cliffBase = new THREE.Mesh(new THREE.BoxGeometry(34, 12, 38), cliffRockMat);
      cliffBase.position.y = 6;
      templeGroup.add(cliffBase);

      // Clifftop Summit Temple Platform
      const summitPlatform = new THREE.Mesh(new THREE.BoxGeometry(26, 1.5, 28), whiteTrimMat);
      summitPlatform.position.y = 12.75;
      templeGroup.add(summitPlatform);

      // Red & Gold Mahakali Shrine Body
      const shrine = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 9), redShrineMat);
      shrine.position.set(0, 16, -3);
      templeGroup.add(shrine);

      // Pyramid Roof Spire with Red Trishul Flag
      for (let i = 0; i < 5; i++) {
        const scale = 1 - (i * 0.15);
        const tier = new THREE.Mesh(new THREE.BoxGeometry(8.5 * scale, 1.2, 8.5 * scale), i % 2 === 0 ? redShrineMat : whiteTrimMat);
        tier.position.set(0, 19.1 + (i * 1.1), -3);
        templeGroup.add(tier);
      }

      // Red Trishul Flag
      const flagStaff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      flagStaff.position.set(0, 25.8, -3);
      templeGroup.add(flagStaff);

      // Ropeway Gondola Cable Car Terminal Station
      const ropewayStation = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 6), new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 }));
      ropewayStation.position.set(-16, 14, 8);
      templeGroup.add(ropewayStation);

    } else {
      // ==========================================
      // 🌊 SOMNATH MAHADEV (SOLANKI KAILASH MAHAMERU & SEA WALL)
      // ==========================================

      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6, metalness: 0.1 });
      const darkStoneMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.2 });
      const oceanMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, transparent: true, opacity: 0.85 });

      // Plinth
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(32, 1.2, 38), darkStoneMat);
      plinth.position.y = 0.6;
      templeGroup.add(plinth);

      // Solanki Kailash Mahameru Shikhara (150ft Spire)
      const sanctum = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 10), stoneMat);
      sanctum.position.set(0, 4.8, -4);
      templeGroup.add(sanctum);

      for (let i = 0; i < 7; i++) {
        const scale = 1 - (i * 0.12);
        const tier = new THREE.Mesh(new THREE.BoxGeometry(9.5 * scale, 1.4, 9.5 * scale), i % 2 === 0 ? stoneMat : darkStoneMat);
        tier.position.set(0, 7.8 + (i * 1.3), -4);
        templeGroup.add(tier);
      }

      // Kalash & Waving Flag (Dhwaja)
      const kalash = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.2, 12), goldMat);
      kalash.position.set(0, 18.7, -4);
      templeGroup.add(kalash);

      const flagStaff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.5), goldMat);
      flagStaff.position.set(0, 20.5, -4);
      templeGroup.add(flagStaff);

      const flagGeo = new THREE.PlaneGeometry(2.2, 1.2, 8, 4);
      const flagMesh = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: 0xf97316, side: THREE.DoubleSide }));
      flagMesh.position.set(1.1, 21.4, -4);
      templeGroup.add(flagMesh);
      flagMeshRef = flagMesh;

      // Baan Stambha (Arrow Pillar facing Ocean South Pole)
      const arrowPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 7), goldMat);
      arrowPillar.position.set(14, 4.5, -10);
      templeGroup.add(arrowPillar);

      // Coastal Arabian Ocean Water Plane
      const ocean = new THREE.Mesh(new THREE.PlaneGeometry(160, 40), oceanMat);
      ocean.rotation.x = -Math.PI / 2;
      ocean.position.set(0, 0.05, -30);
      templeGroup.add(ocean);
      waterMeshRef = ocean;
    }

    // Add surrounding ground plane
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({
      color: selectedTempleId === 'pavagadh' ? 0x334155 : selectedTempleId === 'dwarka' ? 0x451a03 : 0x1e293b,
      roughness: 0.95
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    templeGroup.add(ground);

    scene.add(templeGroup);

    // 6. Build Live 3D Crowd Density Heatmap Rings & Particle System
    const heatRings: THREE.Mesh[] = [];

    currentZone3DData.forEach((z) => {
      // Ground Heat Ring Overlay
      const ringGeo = new THREE.RingGeometry(1.5, 3.8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(z.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(z.pos[0], z.pos[1] + 0.15, z.pos[2]);
      scene.add(ringMesh);
      heatRings.push(ringMesh);

      // Vertical Telemetry Beacon Pillar
      const beaconGeo = new THREE.CylinderGeometry(0.1, 0.1, 6, 8);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(z.color),
        transparent: true,
        opacity: 0.7
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(z.pos[0], 3.2, z.pos[2]);
      scene.add(beacon);

      // Beacon Top Pulsing Sphere Marker
      const beaconTopGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const beaconTopMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(z.color),
        emissive: new THREE.Color(z.color),
        emissiveIntensity: 0.9
      });
      const beaconTop = new THREE.Mesh(beaconTopGeo, beaconTopMat);
      beaconTop.position.set(z.pos[0], 6.4, z.pos[2]);
      beaconTop.userData = { zoneData: z }; // Store zone data for raycasting click
      scene.add(beaconTop);
    });

    // Animated Crowd Particles
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const zoneIndex = i % currentZone3DData.length;
      const targetZone = currentZone3DData[zoneIndex];
      const radius = Math.random() * 3.2;
      const angle = Math.random() * Math.PI * 2;

      particlePositions[i * 3] = targetZone.pos[0] + Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = 0.5 + Math.random() * 1.5;
      particlePositions[i * 3 + 2] = targetZone.pos[2] + Math.sin(angle) * radius;

      const color = new THREE.Color(targetZone.color);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const crowdParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(crowdParticles);

    // 7. Raycasting & Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const hit = intersects[i].object;
        if (hit.userData && hit.userData.zoneData) {
          setSelectedZone(hit.userData.zoneData);
          break;
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', handleCanvasClick);

    // Custom Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationTarget = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationTarget.y += deltaX * 0.005;
      rotationTarget.x += deltaY * 0.005;
      rotationTarget.x = Math.max(0.1, Math.min(Math.PI / 2.2, rotationTarget.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Save references to threeState ref
    threeState.current = {
      scene,
      camera,
      renderer,
      flagMesh: flagMeshRef,
      waterMesh: waterMeshRef,
      heatRings,
      crowdParticles,
      sunLight,
      ambientLight,
      spotLights,
      templeGroup,
      raycaster,
      mouse,
      isDragging,
      previousMousePosition,
      rotationTarget,
      cameraTargetPos: new THREE.Vector3(0, 14, 30),
      cameraLookAtTarget: new THREE.Vector3(0, 4, 0)
    };

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (threeState.current) {
        const { flagMesh, waterMesh, crowdParticles, templeGroup, camera, cameraTargetPos, cameraLookAtTarget } = threeState.current;

        // Wave flag
        if (flagMesh && flagMesh.geometry.attributes.position) {
          const pos = flagMesh.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            pos.setZ(i, Math.sin(elapsedTime * 5 + x * 2) * 0.15);
          }
          pos.needsUpdate = true;
        }

        // Wave water
        if (waterMesh && waterMesh.geometry.attributes.position) {
          const pos = waterMesh.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            pos.setZ(i, Math.sin(elapsedTime * 2 + x * 0.5) * 0.1);
          }
          pos.needsUpdate = true;
        }

        // Pulse crowd particles
        if (crowdParticles && crowdParticles.geometry.attributes.position) {
          const pos = crowdParticles.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            let y = pos.getY(i);
            y += Math.sin(elapsedTime * 3 + i) * 0.005;
            pos.setY(i, y);
          }
          pos.needsUpdate = true;
        }

        // Auto rotate
        if (isAutoRotate && !threeState.current.isDragging) {
          templeGroup.rotation.y += 0.003;
        } else if (threeState.current.rotationTarget) {
          templeGroup.rotation.y = threeState.current.rotationTarget.y;
        }

        camera.position.lerp(cameraTargetPos, 0.05);
        camera.lookAt(cameraLookAtTarget);

        renderer.render(scene, camera);
      }
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !threeState.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      threeState.current.camera.aspect = w / h;
      threeState.current.camera.updateProjectionMatrix();
      threeState.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('click', handleCanvasClick);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [selectedTempleId, lightingMode, isAutoRotate]);

  // Handle Preset Viewpoint Camera Changes
  const setViewpoint = (view: 'aerial' | 'sanctum' | 'entrance' | 'cctv') => {
    setActiveViewpoint(view);
    if (!threeState.current) return;

    if (view === 'aerial') {
      threeState.current.cameraTargetPos.set(0, 36, 28);
      threeState.current.cameraLookAtTarget.set(0, 2, 0);
    } else if (view === 'sanctum') {
      threeState.current.cameraTargetPos.set(0, 12, 22);
      threeState.current.cameraLookAtTarget.set(0, 6, 0);
    } else if (view === 'entrance') {
      threeState.current.cameraTargetPos.set(0, 6, 28);
      threeState.current.cameraLookAtTarget.set(0, 4, 12);
    } else if (view === 'cctv') {
      threeState.current.cameraTargetPos.set(22, 18, 22);
      threeState.current.cameraLookAtTarget.set(0, 4, 0);
    }
  };

  const getArchitectureLabel = (id: TempleId) => {
    switch (id) {
      case 'dwarka': return 'Jagat Mandir 5-Tiered Limestone & 52-Yard Flag';
      case 'ambaji': return 'White Marble & Gabbar Ropeway';
      case 'pavagadh': return 'Clifftop Peak & Ropeway Station';
      default: return 'Kailash Mahameru Solanki & Ocean Wall';
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl bg-slate-950/90`}>
      
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP HEADER CONTROLS BAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Title Badge with Real-Life Temple Architecture Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-xl pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-extrabold text-xs text-white tracking-wide flex items-center gap-1.5">
            Real-Life 3D Twin: <span className="text-amber-400 font-bold">{currentTemple.name}</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.2 font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            {getArchitectureLabel(selectedTempleId)}
          </span>
        </div>

        {/* Viewpoint Preset Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-amber-500/20 backdrop-blur-xl shadow-xl pointer-events-auto">
          <button
            onClick={() => setViewpoint('sanctum')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeViewpoint === 'sanctum'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🛕 Sanctum
          </button>

          <button
            onClick={() => setViewpoint('aerial')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeViewpoint === 'aerial'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🦅 Aerial
          </button>

          <button
            onClick={() => setViewpoint('entrance')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeViewpoint === 'entrance'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🚪 Entry Gate
          </button>

          <button
            onClick={() => setViewpoint('cctv')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeViewpoint === 'cctv'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            📹 CCTV Match
          </button>
        </div>

        {/* Environment & Orbit Toggles */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xl flex items-center gap-1.5 ${
              lightingMode === 'night'
                ? 'bg-indigo-950 text-indigo-200 border-indigo-500/50 shadow-indigo-900/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {lightingMode === 'day' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Daylight</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Aarti Night</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-1.5 rounded-xl border text-xs font-bold transition-all shadow-xl ${
              isAutoRotate
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-400/30'
                : 'bg-slate-900/90 text-slate-300 border-slate-800'
            }`}
            title="Toggle 360° Auto-Rotate"
          >
            <RotateCcw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
          </button>
        </div>

      </div>

      {/* BOTTOM FLOATING TELEMETRY LEGEND */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none">
        <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl flex items-center gap-3 pointer-events-auto">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Live Crowd Telemetry:</span>
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" /> Safe
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" /> Moderate
            </span>
            <span className="flex items-center gap-1 text-rose-400 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" /> Surge Alert
            </span>
          </div>
        </div>

        <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-xl shadow-xl flex items-center gap-2 pointer-events-auto">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Click on 3D beacon spheres to inspect live zone telemetry for {currentTemple.name}!</span>
        </div>
      </div>

      {/* INTERACTIVE SELECTED ZONE MODAL POPUP */}
      {selectedZone && (
        <div className="absolute top-16 right-4 z-30 w-80 bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-2xl p-4 animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedZone.color }} />
              {selectedZone.name}
            </h4>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">Current Occupancy:</span>
              <span className="font-bold text-amber-300">
                {selectedZone.crowdCount} / {selectedZone.capacity} pilgrims
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">Est. Queue Waiting Time:</span>
              <span className="font-bold text-cyan-300">{selectedZone.waitTime} min</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">Crowd Risk Level:</span>
              <span className={`font-extrabold uppercase px-2 py-0.5 rounded text-[10px] ${
                selectedZone.riskLevel === 'critical' ? 'bg-rose-600/30 text-rose-300 border border-rose-500' :
                selectedZone.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                selectedZone.riskLevel === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {selectedZone.riskLevel}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
