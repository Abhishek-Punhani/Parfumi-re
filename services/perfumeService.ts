import axios from "axios";
import type { Perfume } from "@/types/perfume";

export const getPerfumes = async (): Promise<Perfume[]> => {
  const response = await axios.get<Perfume[]>("/api/perfumes/retrieve");
  console.log("Perfumes fetched:", response.data);
  return response.data;
};


export const getPerfumeById = async (id: string): Promise<Perfume> => {
  const response = await axios.get<Perfume>(`/api/perfumes/${id}`);
  return response.data;
}