const classrooms = []; // Mock data for classrooms
const files = []; // Mock data for files

const resolvers = {
  Query: {
    // Classes feed
    getClasses: (parent, args, { verifiedUser }, info) => {
      if (!verifiedUser) {
        throw new Error('You must be logged in to view classes.');
      }

      if (verifiedUser.isTutor) {
        return classrooms.filter(classroom => classroom.tutorId === verifiedUser.userId);
      } else {
        return classrooms.filter(classroom => classroom.students.includes(verifiedUser.userId));
      }
    },
    // Files feed
    getFiles: (parent, { classroomId, fileType, search }, { verifiedUser }, info) => {
      if (!verifiedUser) {
        throw new Error('You must be logged in to view files.');
      }

      const classFiles = files.filter(file => file.classroomId === classroomId && !file.deleted);
      if (fileType) {
        classFiles = classFiles.filter(file => file.fileType === fileType);
      }
      if (search) {
        classFiles = classFiles.filter(file => file.fileName.includes(search));
      }

      return classFiles;
    },
  },
  Mutation: {
    // Create classroom
    createClassroom: (parent, { className }, { verifiedUser }, info) => {
      if (!verifiedUser || !verifiedUser.isTutor) {
        throw new Error('Only tutors can create classrooms.');
      }

      const newClassroom = { id: classrooms.length + 1, name: className, tutorId: verifiedUser.userId, students: [] };
      classrooms.push(newClassroom);
      return newClassroom;
    },
    // Add student to classroom
    addStudentToClassroom: (parent, { classroomId, studentId }, { verifiedUser }, info) => {
      if (!verifiedUser || !verifiedUser.isTutor) {
        throw new Error('Only tutors can add students to classrooms.');
      }

      const classroom = classrooms.find(c => c.id === classroomId);
      if (!classroom) {
        throw new Error('Classroom not found.');
      }

      classroom.students.push(studentId);
      return classroom;
    },
    // Upload file to classroom
    uploadFileToClassroom: (parent, { classroomId, fileName, fileType }, { verifiedUser }, info) => {
      if (!verifiedUser || !verifiedUser.isTutor) {
        throw new Error('Only tutors can upload files to classrooms.');
      }

      const classroom = classrooms.find(c => c.id === classroomId);
      if (!classroom) {
        throw new Error('Classroom not found.');
      }

      const newFile = { id: files.length + 1, fileName, fileType, classroomId };
      files.push(newFile);
      return newFile;
    },
    // Delete file from classroom
    deleteFileFromClassroom: (parent, { fileId }, { verifiedUser }, info) => {
      if (!verifiedUser || !verifiedUser.isTutor) {
        throw new Error('Only tutors can delete files from classrooms.');
      }

      const fileIndex = files.findIndex(file => file.id === fileId);
      if (fileIndex === -1) {
        throw new Error('File not found.');
      }

      files[fileIndex].deleted = true;
      return true;
    },
  },
};

module.exports = resolvers;
