import type { NetworkTemplate, NetworkData } from '../types';

const generateBaseData = (): NetworkData => {
  return {
    nodes: [
      {
        id: 'n-1',
        type: 'customNode',
        position: { x: 400, y: 300 },
        data: {
          label: 'Syed Ali (Raju)',
          type: 'Accused',
          details: {
            profileSummary: 'Key suspect in organized robbery ring.',
            criminalHistory: ['FIR-2026-0123 (Robbery)', 'FIR-2025-0042 (Assault)'],
            connectionsCount: 5,
            riskScore: 88,
            associatedFIRs: ['FIR-2026-0123'],
            timeline: [{ date: '2026-06-15', event: 'Arrested by CCB' }],
            address: 'Mandi Mohalla, Mysuru'
          }
        }
      },
      {
        id: 'n-2',
        type: 'customNode',
        position: { x: 600, y: 200 },
        data: {
          label: 'FIR-2026-0123',
          type: 'Organization',
          details: {
            profileSummary: 'Armed robbery at jewelry store.',
            connectionsCount: 3,
            officerNotes: 'High priority case under Inspector Mahesh.'
          }
        }
      },
      {
        id: 'n-3',
        type: 'customNode',
        position: { x: 200, y: 200 },
        data: {
          label: '9845X XXXXX',
          type: 'PhoneNumber',
          details: {
            phoneNumber: '+91 9845X XXXXX',
            connectionsCount: 2,
            officerNotes: 'Used for coordinating hits.'
          }
        }
      },
      {
        id: 'n-4',
        type: 'customNode',
        position: { x: 600, y: 400 },
        data: {
          label: 'KA-09-ER-4567',
          type: 'Vehicle',
          details: {
            registrationNumber: 'KA-09-ER-4567',
            connectionsCount: 2,
            vehicles: ['Honda Activa (Black)'],
            officerNotes: 'Stolen vehicle used as getaway.'
          }
        }
      },
      {
        id: 'n-5',
        type: 'customNode',
        position: { x: 800, y: 300 },
        data: {
          label: 'Ramesh Jain',
          type: 'Victim',
          details: {
            profileSummary: 'Jewelry store owner',
            connectionsCount: 1,
            riskScore: 10,
            address: 'Devaraja Mohalla, Mysuru'
          }
        }
      },
      {
        id: 'n-6',
        type: 'customNode',
        position: { x: 300, y: 500 },
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
  };
};

export const networkTemplates: NetworkTemplate[] = [
  {
    id: 'robbery-gang',
    name: 'Robbery Gang',
    description: 'Central District Armed Robbery Network',
    data: generateBaseData()
  },
  {
    id: 'cyber-fraud',
    name: 'Cyber Fraud',
    description: 'Phishing Network tracing bank accounts',
    data: {
      nodes: [
        { id: 'n-10', type: 'customNode', position: { x: 400, y: 300 }, data: { label: 'Syed (Hacker)', type: 'Accused', details: { connectionsCount: 6, riskScore: 92 } } },
        { id: 'n-11', type: 'customNode', position: { x: 600, y: 200 }, data: { label: 'ICICI - 9988XXXX', type: 'BankAccount', details: { connectionsCount: 2 } } },
        { id: 'n-12', type: 'customNode', position: { x: 600, y: 400 }, data: { label: 'SBI - 1122XXXX', type: 'BankAccount', details: { connectionsCount: 3 } } },
        { id: 'n-13', type: 'customNode', position: { x: 200, y: 300 }, data: { label: 'Victim A', type: 'Victim', details: { connectionsCount: 1 } } }
      ],
      edges: [
        { id: 'e-10-11', source: 'n-10', target: 'n-11', data: { label: 'Controls', type: 'Owns' } },
        { id: 'e-13-11', source: 'n-13', target: 'n-11', animated: true, data: { label: 'Scammed to', type: 'TransferredFunds' } },
        { id: 'e-11-12', source: 'n-11', target: 'n-12', animated: true, data: { label: 'Laundered', type: 'TransferredFunds' } }
      ]
    }
  }
];
