
import React from 'react';
import { Shield, ShieldAlert, Globe, Smartphone, Mail, Lock } from 'lucide-react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Advanced threat detection and mitigation strategies tailored for enterprise ecosystems.',
    icon: 'Shield',
    category: 'Security'
  },
  {
    id: 'pen-testing',
    title: 'Penetration Testing',
    description: 'Rigorous ethical hacking to identify vulnerabilities before malicious actors do.',
    icon: 'ShieldAlert',
    category: 'Security'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Scalable, performant, and secure web applications built with modern frameworks.',
    icon: 'Globe',
    category: 'Development'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile experiences that put your business in customers\' pockets.',
    icon: 'Smartphone',
    category: 'Development'
  },
  {
    id: 'email-security',
    title: 'Email Security',
    description: 'Zero-trust email protection to eliminate phishing and ransomware threats at the source.',
    icon: 'Mail',
    category: 'Security'
  },
  {
    id: 'mobile-security',
    title: 'Mobile Security',
    description: 'End-to-end encryption and device management for the mobile-first workforce.',
    icon: 'Lock',
    category: 'Security'
  }
];

export const getIcon = (name: string, size = 24) => {
  switch (name) {
    case 'Shield': return <Shield size={size} />;
    case 'ShieldAlert': return <ShieldAlert size={size} />;
    case 'Globe': return <Globe size={size} />;
    case 'Smartphone': return <Smartphone size={size} />;
    case 'Mail': return <Mail size={size} />;
    case 'Lock': return <Lock size={size} />;
    default: return <Shield size={size} />;
  }
};
