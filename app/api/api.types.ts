interface ApiSampleData {
  email: string;
  name?: string;
  pushCount: number,
  attendedDuo: boolean,
}

type ApiDate = string; // 'YYYY-MM-DD'

export type {
  ApiSampleData,
  ApiDate,
}