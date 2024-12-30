"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";
import { SemestersData } from "@/constant/SemesterData";
import  Favourite from "./(makebetter)/Favourite ";

// Define the type for the note object
interface Note {
  _id: string;
  title: string;
  description: string;
  subject: string;
  semester: string;
  chapter: string;
  fileUrl: string;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]); // Use the Note type
  const [filters, setFilters] = useState({
    semester: "",
    subject: "",
    chapter: "",
  });

  // Use useCallback to memoize the fetchNotes function
  const fetchNotes = useCallback(async () => {
    const params = new URLSearchParams();
    if (filters.semester) params.append("semester", filters.semester);
    if (filters.subject) params.append("subject", filters.subject);
    if (filters.chapter) params.append("chapter", filters.chapter);

    const response = await fetch(`/api/notes?${params}`);
    const data = await response.json();
    setNotes(data);
  }, [filters]); // Re-run when filters change

  useEffect(() => {
    fetchNotes(); // Call fetchNotes when filters change
  }, [fetchNotes]); // Make sure fetchNotes is included in the dependency array



  const handlePreview = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  // Get the available subjects and chapters based on the selected semester
  const semesterData = SemestersData.find(
    (semester) => semester.semester === filters.semester
  );
  const subjects = semesterData ? semesterData.subjects : [];
  const chapters = subjects.find(
    (subject) => subject.name === filters.subject
  )?.chapters || [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          value={filters.semester}
          onValueChange={(value) => setFilters({ ...filters, semester: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {SemestersData.map((sem, index) => (
              <SelectItem key={index} value={sem.semester}>
                {sem.semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.subject}
          onValueChange={(value) => setFilters({ ...filters, subject: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject, index) => (
              <SelectItem key={index} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.chapter}
          onValueChange={(value) => setFilters({ ...filters, chapter: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter, index) => (
              <SelectItem key={index} value={chapter.name}>
                {chapter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note._id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{note.description}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">Subject: {note.subject}</p>
                <p className="text-sm">Semester: {note.semester}</p>
                <p className="text-sm">Chapter: {note.chapter}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreview(note.fileUrl)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Favourite itemId={note._id} type="note" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
