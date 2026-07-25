import type { NetworkData } from '../types';

export interface CaseInsight {
  riskAssessment: string;
  riskLevel: 'HIGH PRIORITY' | 'CRITICAL' | 'MEDIUM';
  potentialLeader: {
    name: string;
    initials: string;
    centrality: string;
  };
  hiddenRelationships: string[];
  suggestedLeads: string[];
}

export interface CaseDetail {
  id: string;
  title: string;
  district: string;
  risk: string;
  data: NetworkData;
  insights: CaseInsight;
}

export const CASES_OPTIONS = [
  {
    id: "FIR-2026-0412",
    title: "FIR/2026/0412 - Mysuru Bank Robbery Syndicate",
    district: "Mysuru Urban",
    nodes: 6,
    edges: 5,
    risk: "High Priority"
  },
  {
    id: "FIR-2026-1098",
    title: "FIR/2026/1098 - Cyber Crypto Phishing Network",
    district: "Bengaluru East",
    nodes: 7,
    edges: 6,
    risk: "Critical"
  },
  {
    id: "FIR-2025-0891",
    title: "FIR/2025/0891 - Interstate Vehicle Theft Ring",
    district: "Chamarajanagar",
    nodes: 6,
    edges: 5,
    risk: "Medium"
  }
];

const casesData: Record<string, CaseDetail> = {
  "FIR-2026-0412": {
    id: "FIR-2026-0412",
    title: "FIR/2026/0412 - Mysuru Bank Robbery Syndicate",
    district: "Mysuru Urban",
    risk: "High Priority",
    data: {
      nodes: [
        {
          id: 'n-1',
          type: 'customNode',
          position: { x: 400, y: 300 },
          data: {
            label: 'Syed Ali (Raju)',
            type: 'Accused',
            details: {
              profileSummary: 'Key suspect in Mysuru jewelry heist & robbery ring.',
              criminalHistory: ['FIR-2026-0123 (Robbery)', 'FIR-2025-0042 (Assault)'],
              connectionsCount: 5,
              riskScore: 88,
              associatedFIRs: ['FIR-2026-0412'],
              timeline: [{ date: '2026-06-15', event: 'Arrested by CCB Mysuru' }],
              address: 'Mandi Mohalla, Mysuru'
            }
          }
        },
        {
          id: 'n-2',
          type: 'customNode',
          position: { x: 650, y: 180 },
          data: {
            label: 'FIR-2026-0412',
            type: 'Organization',
            details: {
              profileSummary: 'Armed heist at Mysuru jewelry showroom.',
              connectionsCount: 3,
              officerNotes: 'High priority case under Inspector Mahesh.'
            }
          }
        },
        {
          id: 'n-3',
          type: 'customNode',
          position: { x: 180, y: 220 },
          data: {
            label: '9845X XXXXX',
            type: 'PhoneNumber',
            details: {
              phoneNumber: '+91 9845X XXXXX',
              connectionsCount: 2,
              officerNotes: 'Prepaid line used for coordinating robbery escape routes.'
            }
          }
        },
        {
          id: 'n-4',
          type: 'customNode',
          position: { x: 650, y: 420 },
          data: {
            label: 'KA-09-ER-4567',
            type: 'Vehicle',
            details: {
              registrationNumber: 'KA-09-ER-4567',
              connectionsCount: 2,
              vehicles: ['Black Honda Activa'],
              officerNotes: 'Stolen vehicle used during Mysuru getaway.'
            }
          }
        },
        {
          id: 'n-5',
          type: 'customNode',
          position: { x: 880, y: 280 },
          data: {
            label: 'Ramesh Jain',
            type: 'Victim',
            details: {
              profileSummary: 'Jewelry Store Owner & Complainant',
              connectionsCount: 1,
              riskScore: 10,
              address: 'Devaraja Mohalla, Mysuru'
            }
          }
        },
        {
          id: 'n-6',
          type: 'customNode',
          position: { x: 380, y: 520 },
          data: {
            label: 'HDFC Bank - 0451XXXX',
            type: 'BankAccount',
            details: {
              accountNumber: '0451XXXX2398',
              bankName: 'HDFC Bank',
              connectionsCount: 1,
              financialLinks: ['₹4,50,000 deposited on 2026-07-11']
            }
          }
        }
      ],
      edges: [
        { id: 'e-1-2', source: 'n-1', target: 'n-2', type: 'smoothstep', animated: true, data: { label: 'Accused In', type: 'KnownAssociate' } },
        { id: 'e-1-3', source: 'n-1', target: 'n-3', type: 'smoothstep', data: { label: 'Owns', type: 'Owns' } },
        { id: 'e-1-4', source: 'n-1', target: 'n-4', type: 'smoothstep', animated: true, data: { label: 'Spotted In', type: 'SpottedAt' } },
        { id: 'e-2-5', source: 'n-2', target: 'n-5', type: 'smoothstep', data: { label: 'Reported By', type: 'Reported' } },
        { id: 'e-1-6', source: 'n-1', target: 'n-6', type: 'smoothstep', data: { label: 'Transferred', type: 'TransferredFunds' } }
      ]
    },
    insights: {
      riskAssessment: "High density of financial transactions between unverified accounts and known associates of Syed Ali. Indicates structured money laundering operation.",
      riskLevel: "HIGH PRIORITY",
      potentialLeader: {
        name: "Syed Ali (Raju)",
        initials: "SA",
        centrality: "0.85"
      },
      hiddenRelationships: [
        "Vehicle KA-09-ER-4567 is registered to address matching Bank Account 0451XXXX2398.",
        "Phone 9845X XXXXX pinged near Victim's location during incident window."
      ],
      suggestedLeads: [
        "Subpoena Bank Account Logs (HDFC 0451XXXX)",
        "Locate Vehicle KA-09-ER-4567"
      ]
    }
  },

  "FIR-2026-1098": {
    id: "FIR-2026-1098",
    title: "FIR/2026/1098 - Cyber Crypto Phishing Network",
    district: "Bengaluru East",
    risk: "Critical",
    data: {
      nodes: [
        {
          id: 'n-10',
          type: 'customNode',
          position: { x: 400, y: 300 },
          data: {
            label: 'Vikram Malhotra (Vicky)',
            type: 'Accused',
            details: {
              profileSummary: 'Mastermind of international cyber phishing & crypto scam syndicate.',
              criminalHistory: ['FIR-2026-1098 (Cyber Fraud)', 'FIR-2024-0911 (Identity Theft)'],
              connectionsCount: 6,
              riskScore: 94,
              associatedFIRs: ['FIR-2026-1098'],
              timeline: [{ date: '2026-07-02', event: 'Tracked via Darknet IP Node' }],
              address: 'Indiranagar 100ft Road, Bengaluru'
            }
          }
        },
        {
          id: 'n-11',
          type: 'customNode',
          position: { x: 650, y: 180 },
          data: {
            label: 'FIR-2026-1098',
            type: 'Organization',
            details: {
              profileSummary: 'Sophisticated SMS phishing & bank credential harvesting ring.',
              connectionsCount: 4,
              officerNotes: 'Cyber Crime Police Station Bengaluru East.'
            }
          }
        },
        {
          id: 'n-12',
          type: 'customNode',
          position: { x: 180, y: 220 },
          data: {
            label: '9900X XXXXX',
            type: 'PhoneNumber',
            details: {
              phoneNumber: '+91 9900X XXXXX',
              connectionsCount: 3,
              officerNotes: 'Encrypted VoIP trunk line used to send spoofed bank alerts.'
            }
          }
        },
        {
          id: 'n-13',
          type: 'customNode',
          position: { x: 650, y: 420 },
          data: {
            label: 'KA-01-MV-9988',
            type: 'Vehicle',
            details: {
              registrationNumber: 'KA-01-MV-9988',
              connectionsCount: 2,
              vehicles: ['White Skoda Slavia'],
              officerNotes: 'Registered under shell company software entity.'
            }
          }
        },
        {
          id: 'n-14',
          type: 'customNode',
          position: { x: 880, y: 280 },
          data: {
            label: 'Ananya Rao',
            type: 'Victim',
            details: {
              profileSummary: 'Senior Tech Lead at Whitefield IT Park',
              connectionsCount: 1,
              riskScore: 5,
              address: 'ITPL Main Road, Whitefield'
            }
          }
        },
        {
          id: 'n-15',
          type: 'customNode',
          position: { x: 380, y: 520 },
          data: {
            label: 'ICICI Bank - 9988XXXX',
            type: 'BankAccount',
            details: {
              accountNumber: '9988XXXX4411',
              bankName: 'ICICI Bank',
              connectionsCount: 2,
              financialLinks: ['₹12,50,000 deposited on 2026-07-20']
            }
          }
        },
        {
          id: 'n-16',
          type: 'customNode',
          position: { x: 150, y: 440 },
          data: {
            label: 'Crypto Wallet (0x7F...3B)',
            type: 'BankAccount',
            details: {
              accountNumber: '0x7F29...3B91',
              bankName: 'Ethereum Network',
              connectionsCount: 2,
              financialLinks: ['18.5 ETH transferred off-shore']
            }
          }
        }
      ],
      edges: [
        { id: 'e-10-11', source: 'n-10', target: 'n-11', type: 'smoothstep', animated: true, data: { label: 'Mastermind In', type: 'KnownAssociate' } },
        { id: 'e-10-12', source: 'n-10', target: 'n-12', type: 'smoothstep', data: { label: 'Operates', type: 'Owns' } },
        { id: 'e-10-13', source: 'n-10', target: 'n-13', type: 'smoothstep', animated: true, data: { label: 'Drives', type: 'SpottedAt' } },
        { id: 'e-11-14', source: 'n-11', target: 'n-14', type: 'smoothstep', data: { label: 'Targeted', type: 'Reported' } },
        { id: 'e-10-15', source: 'n-10', target: 'n-15', type: 'smoothstep', animated: true, data: { label: 'Funneled To', type: 'TransferredFunds' } },
        { id: 'e-15-16', source: 'n-15', target: 'n-16', type: 'smoothstep', animated: true, data: { label: 'Laundered to Crypto', type: 'TransferredFunds' } }
      ]
    },
    insights: {
      riskAssessment: "Automated phishing SMS nodes targeting tech professionals in Whitefield & Electronic City. Rapid conversion of stolen funds into offshore crypto wallets.",
      riskLevel: "CRITICAL",
      potentialLeader: {
        name: "Vikram Malhotra (Vicky)",
        initials: "VM",
        centrality: "0.94"
      },
      hiddenRelationships: [
        "IP logs connect Crypto Wallet (0x7F...3B) directly to Vikram Malhotra's residential Wi-Fi AP.",
        "ICICI Account received ₹12.5 Lakhs within 15 minutes of phishing campaign deployment."
      ],
      suggestedLeads: [
        "Issue Emergency Freeze on ICICI 9988XXXX",
        "Request Blockchain Forensics on Wallet 0x7F...3B"
      ]
    }
  },

  "FIR-2025-0891": {
    id: "FIR-2025-0891",
    title: "FIR/2025/0891 - Interstate Vehicle Theft Ring",
    district: "Chamarajanagar",
    risk: "Medium",
    data: {
      nodes: [
        {
          id: 'n-20',
          type: 'customNode',
          position: { x: 400, y: 300 },
          data: {
            label: 'Ganesh Naik (Gani)',
            type: 'Accused',
            details: {
              profileSummary: 'Leader of interstate vehicle theft & chop shop operations.',
              criminalHistory: ['FIR-2025-0891 (Vehicle Theft)', 'FIR-2023-0114 (Forgery)'],
              connectionsCount: 4,
              riskScore: 79,
              associatedFIRs: ['FIR-2025-0891'],
              timeline: [{ date: '2025-11-04', event: 'Spotted near Tamil Nadu Border' }],
              address: 'Gundlupet, Chamarajanagar'
            }
          }
        },
        {
          id: 'n-21',
          type: 'customNode',
          position: { x: 650, y: 180 },
          data: {
            label: 'FIR-2025-0891',
            type: 'Organization',
            details: {
              profileSummary: 'Interstate stolen SUV dismantling & RTO document forgery ring.',
              connectionsCount: 3,
              officerNotes: 'Chamarajanagar Border Patrol Division.'
            }
          }
        },
        {
          id: 'n-22',
          type: 'customNode',
          position: { x: 180, y: 220 },
          data: {
            label: '9731X XXXXX',
            type: 'PhoneNumber',
            details: {
              phoneNumber: '+91 9731X XXXXX',
              connectionsCount: 2,
              officerNotes: 'Prepaid SIM registered under fake ID.'
            }
          }
        },
        {
          id: 'n-23',
          type: 'customNode',
          position: { x: 650, y: 420 },
          data: {
            label: 'KA-11-MJ-2024',
            type: 'Vehicle',
            details: {
              registrationNumber: 'KA-11-MJ-2024',
              connectionsCount: 2,
              vehicles: ['Tata Harrier - Dark Edition'],
              officerNotes: 'Stolen vehicle fitted with tampered chassis number.'
            }
          }
        },
        {
          id: 'n-24',
          type: 'customNode',
          position: { x: 880, y: 280 },
          data: {
            label: 'Suresh Kumar',
            type: 'Victim',
            details: {
              profileSummary: 'Fleet Contractor & SUV Owner',
              connectionsCount: 1,
              riskScore: 8,
              address: 'VV Mohalla, Mysuru'
            }
          }
        },
        {
          id: 'n-25',
          type: 'customNode',
          position: { x: 380, y: 520 },
          data: {
            label: 'Axis Bank - 7712XXXX',
            type: 'BankAccount',
            details: {
              accountNumber: '7712XXXX8800',
              bankName: 'Axis Bank',
              connectionsCount: 1,
              financialLinks: ['₹3,20,000 paid to RTO document forgery broker']
            }
          }
        }
      ],
      edges: [
        { id: 'e-20-21', source: 'n-20', target: 'n-21', type: 'smoothstep', animated: true, data: { label: 'Accused In', type: 'KnownAssociate' } },
        { id: 'e-20-22', source: 'n-20', target: 'n-22', type: 'smoothstep', data: { label: 'Owns Line', type: 'Owns' } },
        { id: 'e-20-23', source: 'n-20', target: 'n-23', type: 'smoothstep', animated: true, data: { label: 'Drives Stolen SUV', type: 'SpottedAt' } },
        { id: 'e-21-24', source: 'n-21', target: 'n-24', type: 'smoothstep', data: { label: 'Stolen From', type: 'Reported' } },
        { id: 'e-20-25', source: 'n-20', target: 'n-25', type: 'smoothstep', data: { label: 'Paid Broker', type: 'TransferredFunds' } }
      ]
    },
    insights: {
      riskAssessment: "Organized vehicle dismantling ring operating along Karnataka-Tamil Nadu border. Stolen SUVs assigned forged chassis numbers and fake RTO paper trails.",
      riskLevel: "MEDIUM",
      potentialLeader: {
        name: "Ganesh Naik (Gani)",
        initials: "GN",
        centrality: "0.79"
      },
      hiddenRelationships: [
        "Tata Harrier KA-11-MJ-2024 chassis number matches stolen vehicle reported in Mysuru.",
        "Axis Bank 7712XXXX shows 6 recurring payments to known fake RTO agent."
      ],
      suggestedLeads: [
        "Raid Border Dismantling Yard in Gundlupet",
        "Seize Tata Harrier KA-11-MJ-2024"
      ]
    }
  }
};

export const getCaseDetail = (caseId: string): CaseDetail => {
  return casesData[caseId] || casesData["FIR-2026-0412"];
};
