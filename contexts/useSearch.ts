import { useState, useEffect, useMemo } from "react";
import { getPerfumes } from "@/services/perfumeService";
import type { Perfume } from "@/types/perfume";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const data = await getPerfumes();
        setPerfumes(data);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
      }
    };

    fetchPerfumes();
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    setIsSearching(true);
    
    const results = perfumes.filter(perfume =>
      perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfume.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfume.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    setIsSearching(false);
    return results;
  }, [searchTerm, perfumes]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching
  };
};
