import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { CommandEmpty, CommandInput, CommandItem, CommandList, ResponsiveCommandDialog } from "./ui/command";

interface SelectorProps {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

export const Selector = ({
    options, onSelect, onSearch, value, placeholder = "Select an option...", className
}: SelectorProps) => {

    const [open, setOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    const handleOpenChange = (value: boolean) => {
        onSearch?.("");
        setOpen(value);
    }

    return (
        <>
            <Button type="button" variant="outline" className={cn(
                "h-9 justify-between font-normal px-2",
                !selectedOption && "text-muted-foreground",
                className
            )} onClick={() => setOpen(true)}>
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>
            <ResponsiveCommandDialog open={open} onOpenChange={handleOpenChange} shouldFilter={!onSearch}>
                <CommandInput placeholder="Type to search..." onValueChange={onSearch}/>
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">No options found.</span>
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem key={option.id} onSelect={() => { onSelect(option.value); setOpen(false); }}>
                            {option.children}
                        </CommandItem> 
                    ))}
                </CommandList>
            </ResponsiveCommandDialog>
        </>
    )
}