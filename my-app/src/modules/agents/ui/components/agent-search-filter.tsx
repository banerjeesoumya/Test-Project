import { Input } from "@/components/ui/input"
import { useFilter } from "../../hooks/use-filter";
import { SearchIcon } from "lucide-react";

export const AgentSearchFilter = () => {

    const [filters, setFilters] = useFilter();

    return (
        <div className="relative">
            <Input placeholder="Filter by name."  className="h-9 bg-white w-[200px] pl-7" value={filters.search} onChange={e => setFilters({ search: e.target.value })}/>
            <SearchIcon className="size-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
        </div>
    )
}