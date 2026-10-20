/**
 * ProgressEye Product Tour & Hero Shared Sample Data Fixtures
 *
 * NOTE: All numbers here are simulated sample data for product previews.
 * All percentages are strictly derived in code from raw counts to guarantee
 * zero contradiction between counts and rendered percentages.
 */

export interface StudentAttendanceSlot {
  id: number;
  rollNo: string;
  name: string;
  isPresent: boolean;
}

export interface FeeTransaction {
  id: string;
  studentName: string;
  grade: string;
  amount: number;
  status: "received" | "reminder_sent";
  date: string;
}

export interface ExamMarkRecord {
  id: string;
  studentName: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: "A+" | "A" | "B+" | "B" | "C" | "D";
}

export interface GradeDistributionBar {
  grade: string;
  count: number;
  colorVar: string;
}

// 1. Attendance Fixtures (Class VIII-A)
export const ATTENDANCE_TOTAL_STUDENTS = 30;
export const ATTENDANCE_ABSENT_STUDENT_INDICES = [7, 19];
export const ATTENDANCE_PRESENT_COUNT =
  ATTENDANCE_TOTAL_STUDENTS - ATTENDANCE_ABSENT_STUDENT_INDICES.length; // 28
export const ATTENDANCE_DERIVED_PERCENT = Math.round(
  (ATTENDANCE_PRESENT_COUNT / ATTENDANCE_TOTAL_STUDENTS) * 100,
); // 93%

// Generate 30 student mock slots
export const ATTENDANCE_STUDENTS: StudentAttendanceSlot[] = Array.from(
  { length: ATTENDANCE_TOTAL_STUDENTS },
  (_, i) => {
    const isAbsent = ATTENDANCE_ABSENT_STUDENT_INDICES.includes(i + 1);
    return {
      id: i + 1,
      rollNo: `08A-${String(i + 1).padStart(2, "0")}`,
      name: `Student ${i + 1}`,
      isPresent: !isAbsent,
    };
  },
);

// 2. Fee Collection Fixtures (Term 2)
export const FEE_COLLECTED_AMOUNT = 1482500;
export const FEE_TARGET_AMOUNT = 1700000;
export const FEE_DERIVED_PERCENT = Math.round((FEE_COLLECTED_AMOUNT / FEE_TARGET_AMOUNT) * 100); // 87%

export const RECENT_FEE_TRANSACTIONS: FeeTransaction[] = [
  {
    id: "tx-1",
    studentName: "Aarav Sharma",
    grade: "Class VIII-A",
    amount: 12000,
    status: "received",
    date: "Today, 10:24 AM",
  },
  {
    id: "tx-2",
    studentName: "Diya Patel",
    grade: "Class VI-B",
    amount: 9500,
    status: "received",
    date: "Today, 09:45 AM",
  },
  {
    id: "tx-3",
    studentName: "Rohan Mehta",
    grade: "Class X-C",
    amount: 15000,
    status: "reminder_sent",
    date: "Yesterday",
  },
];

// 3. Exam Grade Distribution Fixtures (Mathematics Term 1)
export const EXAM_GRADED_COUNT = 53;
export const EXAM_TOTAL_STUDENTS = 53;
export const EXAM_DERIVED_PERCENT = Math.round((EXAM_GRADED_COUNT / EXAM_TOTAL_STUDENTS) * 100); // 100%

export const EXAM_GRADE_DISTRIBUTION: GradeDistributionBar[] = [
  { grade: "A+", count: 12, colorVar: "var(--color-brand)" },
  { grade: "A", count: 18, colorVar: "var(--color-brand-hover)" },
  { grade: "B", count: 14, colorVar: "var(--color-interactive)" },
  { grade: "C", count: 7, colorVar: "var(--color-border-focus)" },
  { grade: "D", count: 2, colorVar: "var(--color-warning)" },
];

export const SAMPLE_EXAM_MARKS: ExamMarkRecord[] = [
  {
    id: "ex-1",
    studentName: "Priya Iyer",
    subject: "Mathematics",
    marks: 92,
    totalMarks: 100,
    grade: "A+",
  },
  {
    id: "ex-2",
    studentName: "Aditya Roy",
    subject: "Mathematics",
    marks: 95,
    totalMarks: 100,
    grade: "A+",
  },
  {
    id: "ex-3",
    studentName: "Karan Singh",
    subject: "Mathematics",
    marks: 87,
    totalMarks: 100,
    grade: "A",
  },
  {
    id: "ex-4",
    studentName: "Ananya Deshmukh",
    subject: "Mathematics",
    marks: 84,
    totalMarks: 100,
    grade: "A",
  },
  {
    id: "ex-5",
    studentName: "Meera Joshi",
    subject: "Mathematics",
    marks: 78,
    totalMarks: 100,
    grade: "B+",
  },
];
