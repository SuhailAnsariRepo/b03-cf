# Class Files System

This system allows students and tutors to communicate through files. It has the following features:

- There are two types of users in the system: Tutor and Student.
- Tutors can create classrooms and add students to the classroom.
- Tutors can share files to a classroom. Files should be visible to only those students who are part of the classroom.
- Files can only be created, updated, and deleted by the tutor.
- Each file must consist of a name, description, uploaded at, uploaded by and file details field.
- File type can be Image, Audio, Video or URL.
- Students must be able to view files.

## Database Schema

The SQL tables for users, classrooms, and files are structured as follows:

```sql
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    UserType ENUM('Tutor', 'Student') NOT NULL,
    UserName VARCHAR(255) NOT NULL,
    UserEmail VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Classrooms (
    ClassroomID INT PRIMARY KEY,
    TutorID INT,
    ClassName VARCHAR(255) NOT NULL,
    FOREIGN KEY (TutorID) REFERENCES Users(UserID)
);

CREATE TABLE ClassroomStudents (
    ClassroomID INT,
    StudentID INT,
    PRIMARY KEY (ClassroomID, StudentID),
    FOREIGN KEY (ClassroomID) REFERENCES Classrooms(ClassroomID),
    FOREIGN KEY (StudentID) REFERENCES Users(UserID)
);

CREATE TABLE Files (
    FileID INT PRIMARY KEY,
    FileName VARCHAR(255) NOT NULL,
    FileDescription TEXT,
    UploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UploadedBy INT,
    FileType ENUM('Image', 'Audio', 'Video', 'URL') NOT NULL,
    FileDetails BLOB,
    ClassroomID INT,
    FOREIGN KEY (UploadedBy) REFERENCES Users(UserID),
    FOREIGN KEY (ClassroomID) REFERENCES Classrooms(ClassroomID)
);
