"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { JournalEntry } from "@/lib/types";
import {
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { capitalize } from "lodash";

interface JournalEntryCardProps {
  entry: JournalEntry;
  onDelete?: (id: string) => void;
}

export function JournalEntryCard({ entry, onDelete }: JournalEntryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPreview = (content: string) => {
    // Remove markdown formatting and get first 150 characters
    if (!content) return "No content available";
    const plainText = content.replace(/[#*`]/g, "").replace(/\n/g, " ");
    return plainText.length > 150
      ? plainText.substring(0, 150) + "..."
      : plainText;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Featured Image */}
      {entry.image_url ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={entry.image_url || "/placeholder.svg"}
            alt={entry.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/journal/${entry.uuid}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/journal/${entry.uuid}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete?.(entry.uuid)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link href={`/journal/${entry.uuid}`} className="block">
              <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 hover:text-blue-200 transition-colors">
                {capitalize(entry.journal_title)}
              </h3>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(entry.created_at)}
                {entry.updatedAt !== entry.created_at && (
                  <span className="ml-2 text-xs">(edited)</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 line-clamp-2">
                <Link
                  href={`/journal/${entry.uuid}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {capitalize(entry.journal_title)}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(entry.created_at)}
                {/* {entry.updated_at !== entry.created_at && (
                  <span className="ml-2 text-xs">(edited)</span>
                )} */}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/journal/${entry.uuid}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/journal/${entry.uuid}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete?.(entry.uuid)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {!entry.image_url && (
          <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
            {getPreview(entry.journal_content)}
          </p>
        )}

        {entry.image_url && (
          <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 text-sm">
            {getPreview(entry.journal_content)}
          </p>
        )}
        {entry.journal_tags && entry.journal_tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entry.journal_tags.slice(0, entry.image_url ? 3 : 5).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {!entry.image_url && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center text-slate-400 dark:text-slate-500 text-sm">
              <ImageIcon className="h-4 w-4 mr-1" />
              <span>No featured image</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
