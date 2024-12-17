export type UserSendsData = {
  id: number;
  date: string;
  attempts: number;
  grade: string;
  quality: number;
  notes: string;
};

export type Options = {
  title: string;
  onPress: () => void;
  color: string;
};
