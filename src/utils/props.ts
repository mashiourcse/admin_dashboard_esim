export interface ChannelData {
  source: {
    label: string;
    value: string;
    logo: string;
  };
  visitors: {
    label: string;
    value: number;
  };
  revenues: {
    label: string;
    value: number;
  };
  sales: {
    label: string;
    value: number;
  };
  conversion: {
    label: string;
    value: number;
  };
}

export interface UsersProps {
  username: {
    label: string;
    value: string;
    logo: string;
  };
  email: {
    label: string;
    value: string;
  };
  role: {
    label: string;
    value: string;
  };
  actions: {
    label: string;
    value: number;
  };
  
}

