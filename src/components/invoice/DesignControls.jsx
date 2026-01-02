import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/select";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { FONTS } from "@/lib/fontConfig";

const COLORS = [
  { name: "Blue", value: "blue-600", hex: "#2563eb" },
  { name: "Emerald", value: "emerald-600", hex: "#059669" },
  { name: "Rose", value: "rose-600", hex: "#e11d48" },
  { name: "Amber", value: "amber-600", hex: "#d97706" },
  { name: "Slate", value: "slate-600", hex: "#475569" },
];

export function DesignControls() {
  const { design, setDesignProperty } = useInvoiceStore();
  const colorMap = {
    "blue-600": "#2563eb",
    "emerald-600": "#059669",
    "rose-600": "#e11d48",
    "amber-600": "#d97706",
    "slate-600": "#475569",
  };
  const accentHex = design.accentColor.startsWith("#")
    ? design.accentColor
    : colorMap[design.accentColor] || "#2563eb";
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/50 p-4">
        <h3 className="font-semibold mb-1 text-sm uppercase tracking-wider">
          Support the Project
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          If you find Co-Invoice useful, consider starring the repository on
          GitHub. It helps the project grow and reach more developers.
        </p>

        <div className="mt-3">
          <a
            href="https://github.com/mraxays/co-invoice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-semibold items-center gap-2 text-xs px-3 py-1.5 rounded-md border transition-colors hover:bg-background/40"
            style={{ color: accentHex, borderColor: accentHex }}
          >
            <Github />
            Star on GitHub
          </a>
        </div>
      </div>

      <div className="space-y-2 p-2 rounded-lg border border-border/50">
        <Label>Theme</Label>
        <div className="flex items-center gap-4 bg-background/50 p-2 rounded-lg border border-border/50">
          <div className="flex-1 text-sm text-muted-foreground">Dark Mode</div>
          <button
            onClick={() => setDesignProperty("darkMode", !design.darkMode)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              design.darkMode ? "bg-primary" : "bg-input"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                design.darkMode ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2 p-2 rounded-lg border border-border/50">
        <Label>Accent Color</Label>
        <div className="flex flex-wrap gap-2 items-center">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setDesignProperty("accentColor", color.value)}
              className={cn(
                "w-8 h-8 rounded-sm border-2 transition-all",
                design.accentColor === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}

          {/* Custom Color Picker */}
          <div className="relative">
            <input
              type="color"
              value={
                design.accentColor.startsWith("#")
                  ? design.accentColor
                  : "#2563eb"
              }
              onChange={(e) => setDesignProperty("accentColor", e.target.value)}
              className="w-8 h-8 rounded-sm border-gray-300 cursor-pointer"
              title="Custom Color"
            />
            <div className="absolute -bottom-5 left-0 text-[10px] text-gray-400 whitespace-nowrap">
              Custom
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-2 rounded-lg border border-border/50">
        <Label>Typography</Label>
        <Select
          value={design.fontStack}
          onValueChange={(v) => setDesignProperty("fontStack", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="opacity-60 uppercase tracking-widest">Serif Fonts</SelectLabel>
              {FONTS.serif.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="opacity-60 uppercase tracking-widest">Sans Serif Fonts</SelectLabel>
              {FONTS.sans.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="opacity-60 uppercase tracking-widest">Monospace Fonts</SelectLabel>
              {FONTS.mono.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 p-2 rounded-lg border border-border/50">
        <Label>Template Style</Label>

        <div className="bg-background/50 ">
          <Tabs
            value={design.template}
            onValueChange={(v) => setDesignProperty("template", v)}
          >
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="modern">Modern</TabsTrigger>
              <TabsTrigger value="classic">Classic</TabsTrigger>
              <TabsTrigger value="bold">Bold</TabsTrigger>
              <TabsTrigger value="minimal">Minimal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
