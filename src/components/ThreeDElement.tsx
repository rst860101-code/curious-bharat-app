import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ThreeDElementType = 'priceTag' | 'trophy' | 'cap' | 'questionMark' | 'car' | 'tree';

interface ThreeDElementProps {
  type: ThreeDElementType;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  colorOverride?: string;
}

export default function ThreeDElement({
  type,
  className = 'w-full h-full',
  autoRotate = true,
  interactive = true,
  colorOverride
}: ThreeDElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 150;
    let height = container.clientHeight || 150;

    // Create Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    
    // Transparent background
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Warm, High-Fidelity Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffdbb5, 0.8); // warm back light
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.6, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Parent group to hold our meshes and support rotations/animations
    const group = new THREE.Group();
    scene.add(group);

    // Create Procedural meshes based on the Type
    let modelMesh: THREE.Object3D;

    switch (type) {
      case 'priceTag': {
        // Red Price Tag
        const tagGroup = new THREE.Group();
        
        // Main Tag Body Shape (Extruded shape with clipped corner at the top)
        const tagShape = new THREE.Shape();
        const w = 1.0;
        const h = 1.6;
        const clip = 0.3;

        tagShape.moveTo(-w/2, -h/2);
        tagShape.lineTo(w/2, -h/2);
        tagShape.lineTo(w/2, h/2 - clip);
        tagShape.lineTo(w/2 - clip, h/2);
        tagShape.lineTo(-w/2 + clip, h/2);
        tagShape.lineTo(-w/2, h/2 - clip);
        tagShape.closePath();

        const extrudeSettings = {
          depth: 0.08,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.02,
          bevelThickness: 0.02
        };

        const tagColor = colorOverride || '#ef4444'; // Red tag
        const tagMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(tagColor),
          roughness: 0.15,
          metalness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });

        const tagBody = new THREE.Mesh(new THREE.ExtrudeGeometry(tagShape, extrudeSettings), tagMaterial);
        tagBody.position.z = -0.04; // Center the depth
        tagGroup.add(tagBody);

        // Metal eyelet hole
        const eyeletGeom = new THREE.TorusGeometry(0.08, 0.03, 12, 24);
        const eyeletMat = new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          metalness: 0.9,
          roughness: 0.1
        });
        const eyelet = new THREE.Mesh(eyeletGeom, eyeletMat);
        eyelet.position.set(0, h/2 - 0.22, 0.04);
        tagGroup.add(eyelet);

        // White paper price label strip
        const labelGeom = new THREE.BoxGeometry(0.6, 0.5, 0.01);
        const labelMat = new THREE.MeshStandardMaterial({
          color: 0xfbfbfb,
          roughness: 0.7
        });
        const label = new THREE.Mesh(labelGeom, labelMat);
        label.position.set(0, -0.2, 0.06);
        tagGroup.add(label);

        // String hanging from the eyelet
        const stringGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 8);
        const stringMat = new THREE.MeshBasicMaterial({ color: 0xdddddd });
        const stringMesh = new THREE.Mesh(stringGeom, stringMat);
        stringMesh.position.set(0, h/2 + 0.08, 0.04);
        stringMesh.rotation.z = -0.1;
        tagGroup.add(stringMesh);

        modelMesh = tagGroup;
        break;
      }

      case 'trophy': {
        // Golden Trophy Cup
        const trophyGroup = new THREE.Group();

        // 1. Black marble base
        const baseGeom = new THREE.CylinderGeometry(0.4, 0.5, 0.35, 16);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          roughness: 0.2,
          metalness: 0.2
        });
        const base = new THREE.Mesh(baseGeom, baseMat);
        base.position.y = -0.8;
        trophyGroup.add(base);

        // 2. Gold Stem / Support
        const stemGeom = new THREE.CylinderGeometry(0.12, 0.18, 0.4, 16);
        const goldMaterial = new THREE.MeshStandardMaterial({
          color: 0xfacc15, // Golden color
          metalness: 0.9,
          roughness: 0.15
        });
        const stem = new THREE.Mesh(stemGeom, goldMaterial);
        stem.position.y = -0.45;
        trophyGroup.add(stem);

        // 3. Central Trophy Sphere Node
        const nodeGeom = new THREE.SphereGeometry(0.18, 16, 16);
        const node = new THREE.Mesh(nodeGeom, goldMaterial);
        node.position.y = -0.25;
        trophyGroup.add(node);

        // 4. Main Chalice / Cup Body
        const cupGeom = new THREE.CylinderGeometry(0.6, 0.25, 0.8, 24, 1, true); // open-ended cup
        const cup = new THREE.Mesh(cupGeom, goldMaterial);
        cup.position.y = 0.25;
        trophyGroup.add(cup);

        // Inner cup base filler to make it look solid
        const fillerGeom = new THREE.CylinderGeometry(0.58, 0.23, 0.78, 24);
        const filler = new THREE.Mesh(fillerGeom, goldMaterial);
        filler.position.y = 0.24;
        trophyGroup.add(filler);

        // 5. Left and Right Handles
        const handleGeom = new THREE.TorusGeometry(0.3, 0.06, 12, 24, Math.PI * 1.2);
        const leftHandle = new THREE.Mesh(handleGeom, goldMaterial);
        leftHandle.position.set(-0.48, 0.3, 0);
        leftHandle.rotation.z = Math.PI * 0.9;
        trophyGroup.add(leftHandle);

        const rightHandle = new THREE.Mesh(handleGeom, goldMaterial);
        rightHandle.position.set(0.48, 0.3, 0);
        rightHandle.rotation.z = -Math.PI * 0.9;
        rightHandle.rotation.y = Math.PI; // flip
        trophyGroup.add(rightHandle);

        // Star sticker emblem on front
        const emblemGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16);
        const emblemMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const emblem = new THREE.Mesh(emblemGeom, emblemMat);
        emblem.position.set(0, 0.25, 0.44);
        emblem.rotation.x = Math.PI / 2;
        trophyGroup.add(emblem);

        modelMesh = trophyGroup;
        break;
      }

      case 'cap': {
        // Graduation mortarboard cap
        const capGroup = new THREE.Group();

        // 1. Main Square Flat Board on top
        const boardGeom = new THREE.BoxGeometry(1.6, 0.06, 1.6);
        const boardMat = new THREE.MeshStandardMaterial({
          color: 0x1e1b4b, // Dark indigo
          roughness: 0.4,
          metalness: 0.1
        });
        const board = new THREE.Mesh(boardGeom, boardMat);
        board.position.y = 0.35;
        board.rotation.y = Math.PI / 4; // Rotated diamond look
        capGroup.add(board);

        // 2. Skull Cap cylinder below
        const skullGeom = new THREE.CylinderGeometry(0.5, 0.54, 0.45, 24);
        const skull = new THREE.Mesh(skullGeom, boardMat);
        skull.position.y = 0.12;
        capGroup.add(skull);

        // 3. Mini Button on very top center
        const buttonGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12);
        const tasselMat = new THREE.MeshStandardMaterial({
          color: 0xfacc15, // Golden yellow tassel
          metalness: 0.7,
          roughness: 0.2
        });
        const button = new THREE.Mesh(buttonGeom, tasselMat);
        button.position.y = 0.4;
        capGroup.add(button);

        // 4. Hanging tassel cord
        const cordGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.8, 8);
        const cord = new THREE.Mesh(cordGeom, tasselMat);
        cord.position.set(0.4, 0.1, 0.4);
        cord.rotation.z = -0.4;
        cord.rotation.x = 0.4;
        capGroup.add(cord);

        // 5. Tassel brush ending
        const brushGeom = new THREE.CylinderGeometry(0.04, 0.06, 0.22, 12);
        const brush = new THREE.Mesh(brushGeom, tasselMat);
        brush.position.set(0.62, -0.22, 0.62);
        capGroup.add(brush);

        modelMesh = capGroup;
        break;
      }

      case 'questionMark': {
        // Plump gloss 3D Question Mark
        const qGroup = new THREE.Group();

        // Shape for custom extruded "?"
        const qShape = new THREE.Shape();
        // Outer loop of question mark
        qShape.moveTo(-0.15, -0.2);
        qShape.lineTo(0.15, -0.2);
        qShape.lineTo(0.15, 0.1);
        qShape.bezierCurveTo(0.15, 0.4, 0.45, 0.4, 0.45, 0.7);
        qShape.bezierCurveTo(0.45, 1.1, -0.45, 1.1, -0.45, 0.7);
        qShape.lineTo(-0.15, 0.7);
        qShape.bezierCurveTo(-0.15, 0.85, 0.15, 0.85, 0.15, 0.7);
        qShape.bezierCurveTo(0.15, 0.55, -0.15, 0.5, -0.15, 0.1);
        qShape.closePath();

        const extrudeSettings = {
          depth: 0.25,
          bevelEnabled: true,
          bevelSegments: 5,
          steps: 1,
          bevelSize: 0.05,
          bevelThickness: 0.05
        };

        const qColor = colorOverride || '#fbbf24'; // Golden amber
        const qMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(qColor),
          roughness: 0.1,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });

        const mainQ = new THREE.Mesh(new THREE.ExtrudeGeometry(qShape, extrudeSettings), qMaterial);
        mainQ.position.set(0, -0.1, -0.12);
        qGroup.add(mainQ);

        // Question mark dot
        const dotGeom = new THREE.SphereGeometry(0.16, 24, 24);
        const dot = new THREE.Mesh(dotGeom, qMaterial);
        dot.position.set(0, -0.58, 0);
        qGroup.add(dot);

        modelMesh = qGroup;
        break;
      }

      case 'car': {
        // High fidelity sports car model
        const carGroup = new THREE.Group();

        const bodyColor = colorOverride || '#3b82f6'; // Bright royal blue
        const bodyMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(bodyColor),
          roughness: 0.15,
          metalness: 0.2,
          clearcoat: 1.0
        });

        const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x0a0a0a,
          roughness: 0.05,
          metalness: 0.9,
          transmission: 0.9,
          transparent: true
        });

        // Main chassis
        const chassisGeom = new THREE.BoxGeometry(1.5, 0.35, 0.85);
        const chassis = new THREE.Mesh(chassisGeom, bodyMat);
        chassis.position.y = -0.1;
        carGroup.add(chassis);

        // Cabin top
        const cabinGeom = new THREE.BoxGeometry(0.8, 0.3, 0.75);
        const cabin = new THREE.Mesh(cabinGeom, bodyMat);
        cabin.position.set(-0.1, 0.2, 0);
        carGroup.add(cabin);

        // Windshield glass
        const windGeom = new THREE.BoxGeometry(0.3, 0.25, 0.7);
        const windshield = new THREE.Mesh(windGeom, glassMat);
        windshield.position.set(0.34, 0.16, 0);
        windshield.rotation.z = -0.6;
        carGroup.add(windshield);

        // Front Hood curve
        const hoodGeom = new THREE.BoxGeometry(0.4, 0.2, 0.85);
        const hood = new THREE.Mesh(hoodGeom, bodyMat);
        hood.position.set(0.7, -0.05, 0);
        carGroup.add(hood);

        // Wheels
        const wheelGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 16);
        const wheels: THREE.Mesh[] = [];

        const positions = [
          [-0.45, -0.22, 0.44], // rear left
          [0.45, -0.22, 0.44],  // front left
          [-0.45, -0.22, -0.44], // rear right
          [0.45, -0.22, -0.44]   // front right
        ];

        positions.forEach((pos) => {
          const wheel = new THREE.Mesh(wheelGeom, blackMat);
          wheel.position.set(pos[0], pos[1], pos[2]);
          wheel.rotation.x = Math.PI / 2;
          carGroup.add(wheel);
          wheels.push(wheel);
        });

        // Golden headlights
        const lightGeom = new THREE.BoxGeometry(0.06, 0.08, 0.15);
        const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const leftLight = new THREE.Mesh(lightGeom, lightMat);
        leftLight.position.set(0.9, -0.05, 0.26);
        carGroup.add(leftLight);

        const rightLight = new THREE.Mesh(lightGeom, lightMat);
        rightLight.position.set(0.9, -0.05, -0.26);
        carGroup.add(rightLight);

        modelMesh = carGroup;
        break;
      }

      case 'tree': {
        // Aesthetic Low-Poly Tree
        const treeGroup = new THREE.Group();

        // Trunk
        const trunkGeom = new THREE.CylinderGeometry(0.12, 0.18, 0.8, 8);
        const trunkMat = new THREE.MeshStandardMaterial({
          color: 0x78350f, // brown
          roughness: 0.8
        });
        const trunk = new THREE.Mesh(trunkGeom, trunkMat);
        trunk.position.y = -0.5;
        treeGroup.add(trunk);

        // Canopy layered spheres/cones for a cute bento-look
        const foliageMat = new THREE.MeshStandardMaterial({
          color: 0x10b981, // Emerald green
          roughness: 0.6,
          metalness: 0.1
        });

        // Layer 1 (bottom foliage)
        const f1Geom = new THREE.SphereGeometry(0.55, 12, 12);
        const f1 = new THREE.Mesh(f1Geom, foliageMat);
        f1.position.y = -0.1;
        treeGroup.add(f1);

        // Layer 2 (mid foliage)
        const f2Geom = new THREE.SphereGeometry(0.45, 12, 12);
        const f2 = new THREE.Mesh(f2Geom, foliageMat);
        f2.position.set(0.1, 0.3, -0.05);
        treeGroup.add(f2);

        // Layer 3 (top foliage)
        const f3Geom = new THREE.SphereGeometry(0.32, 12, 12);
        const f3 = new THREE.Mesh(f3Geom, foliageMat);
        f3.position.set(-0.1, 0.6, 0.05);
        treeGroup.add(f3);

        modelMesh = treeGroup;
        break;
      }

      default:
        // Fallback simple wireframe cube
        const boxGeom = new THREE.BoxGeometry(1, 1, 1);
        const boxMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        modelMesh = new THREE.Mesh(boxGeom, boxMat);
    }

    group.add(modelMesh);

    // Initial scale-up animation with significantly enlarged model dimensions
    group.scale.set(0.001, 0.001, 0.001);
    let targetScale = 1.35;
    if (type === 'priceTag') targetScale = 1.9;
    if (type === 'trophy') targetScale = 1.95;
    if (type === 'cap') targetScale = 1.95;
    if (type === 'questionMark') targetScale = 1.9;
    if (type === 'car') targetScale = 2.1;
    if (type === 'tree') targetScale = 1.8;

    // Viewport relative scroll-based parallax tracking
    let scrollProgress = 0; // -1 to +1 depending on position in viewport
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how far the center of the element is from the center of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = viewHeight / 2;
      
      // Normalize scroll range securely
      const denom = (viewHeight / 2) + 200;
      targetScrollProgress = (elementCenter - screenCenter) / denom;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial evaluation
    handleScroll();

    // Interaction handlers
    let isHovered = false;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      
      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.8;
    };

    const handlePointerEnter = () => {
      isHovered = true;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetRotationX = 0;
      targetRotationY = 0;
    };

    if (interactive) {
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerenter', handlePointerEnter);
      container.addEventListener('pointerleave', handlePointerLeave);
    }

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Scale transition
      if (group.scale.x < targetScale) {
        const s = THREE.MathUtils.lerp(group.scale.x, targetScale, 0.08);
        group.scale.set(s, s, s);
      }

      // Smoothly lerp our scroll progress to avoid any snapping/flickering
      scrollProgress = THREE.MathUtils.lerp(scrollProgress, targetScrollProgress, 0.08);

      // Parallax values (moves slower/faster in Z and slight rotational reaction)
      const parallaxY = -scrollProgress * 0.45; 
      const parallaxRotY = scrollProgress * 0.7;
      const parallaxRotX = scrollProgress * 0.3;

      // Base idle floating
      const idleFloat = Math.sin(elapsedTime * 1.5) * 0.08;

      // Combine floating height and parallax height offset
      group.position.y = idleFloat + parallaxY;

      // Continuous automatic idle motion (floating and slight rotating) combined with scroll parallax rotation
      if (autoRotate && !isHovered) {
        if (type === 'priceTag') {
          group.rotation.y = Math.sin(elapsedTime * 0.6) * 0.25 + parallaxRotY;
          group.rotation.x = Math.sin(elapsedTime * 0.8) * 0.15 + parallaxRotX;
        } else if (type === 'trophy') {
          group.rotation.y = (elapsedTime * 0.4) + parallaxRotY;
          group.rotation.x = parallaxRotX;
        } else if (type === 'cap') {
          group.rotation.y = Math.sin(elapsedTime * 0.4) * 0.3 + parallaxRotY;
          group.rotation.x = parallaxRotX;
          group.rotation.z = Math.cos(elapsedTime * 0.5) * 0.05;
        } else if (type === 'questionMark') {
          group.rotation.y = (elapsedTime * 0.6) + parallaxRotY;
          group.rotation.x = parallaxRotX;
        } else if (type === 'car') {
          group.rotation.y = (elapsedTime * 0.3) + parallaxRotY;
          group.rotation.x = parallaxRotX;
        } else if (type === 'tree') {
          group.rotation.y = Math.sin(elapsedTime * 0.4) * 0.15 + parallaxRotY;
          group.rotation.z = Math.sin(elapsedTime * 1.0) * 0.04;
          group.rotation.x = parallaxRotX;
        }
      } else {
        // Apply smooth scroll parallax rotations even when autoRotate is false or hovering
        group.rotation.y = parallaxRotY;
        group.rotation.x = parallaxRotX;
      }

      // Smooth interpolation for interactive cursor response
      if (interactive) {
        currentRotationX = THREE.MathUtils.lerp(currentRotationX, targetRotationX, 0.1);
        currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.1);

        if (isHovered) {
          modelMesh.rotation.x = currentRotationX;
          modelMesh.rotation.y = currentRotationY;
        } else {
          // decay back to default
          modelMesh.rotation.x = THREE.MathUtils.lerp(modelMesh.rotation.x, 0, 0.08);
          if (!autoRotate) {
            modelMesh.rotation.y = THREE.MathUtils.lerp(modelMesh.rotation.y, 0, 0.08);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer for fluidity
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width || 150;
        height = entry.contentRect.height || 150;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (interactive) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerenter', handlePointerEnter);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
      container.removeChild(renderer.domElement);

      // Recursive disposal of ThreeJS resources
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [type, autoRotate, interactive, colorOverride]);

  return (
    <div 
      ref={containerRef} 
      className={`${className} cursor-grab active:cursor-grabbing select-none outline-none`}
    />
  );
}
