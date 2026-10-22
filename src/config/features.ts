/**
 * ProgressEye Features Page Configuration
 *
 * Governed strictly by Decision D-032 (Zero-Invented-Claims & Features Planned Architecture).
 *
 * Mandatory Rules:
 * - Every module and capability item is labeled "planned".
 * - Phrasing uses intentional and future-oriented language ("Planned design to...", "Aims to support...").
 * - Zero present-tense feature claims.
 * - Zero numbers, zero quantitative claims.
 * - Zero timing promises (no delivery dates or quarters).
 * - Zero competitor claims.
 * - Zero board names (no CBSE, ICSE, or State Boards).
 * - Zero WhatsApp mentions.
 */

export interface FeatureHighlight {
  title: string;
  description: string;
  status: "planned";
}

export interface FeatureModule {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  status: "planned";
  highlights: FeatureHighlight[];
}

export interface FeaturesConfig {
  headline: string;
  subheadline: string;
  disclaimer: string;
  modules: FeatureModule[];
}

export const featuresConfig: FeaturesConfig = {
  headline: "Planned Capabilities for Modern School Operations",
  subheadline:
    "An architectural overview of the modules currently planned for development. Every interface is designed to provide clear, calm workflows without unnecessary complexity.",
  disclaimer:
    "All capabilities listed below represent planned functionality under active architectural design. ProgressEye does not assert unbuilt modules as existing software.",
  modules: [
    {
      id: "attendance",
      name: "Daily Attendance Engine",
      category: "Operations",
      tagline: "Planned roll call workflows with guardian absence alerts.",
      overview:
        "Designed to help teachers record classroom attendance rapidly from desktop or mobile devices and notify guardians of student absences.",
      status: "planned",
      highlights: [
        {
          title: "Quick classroom roll call",
          description: "Planned interface designed for roll call submission in seconds.",
          status: "planned",
        },
        {
          title: "Absence notifications",
          description:
            "Planned automated alerts sent to parents and guardians when a student is marked absent.",
          status: "planned",
        },
        {
          title: "Attendance history logs",
          description:
            "Planned central register of attendance records accessible to administrators and teachers.",
          status: "planned",
        },
      ],
    },
    {
      id: "fees",
      name: "Fee Collection & Receipts",
      category: "Finance",
      tagline: "Planned digital payment collection and automated receipt generation.",
      overview:
        "Designed to support scheduled fee cycles, online payment intake, and clear payment records for parents and bursars.",
      status: "planned",
      highlights: [
        {
          title: "Online payment options",
          description: "Planned payment workflows supporting digital payment methods.",
          status: "planned",
        },
        {
          title: "Automated digital receipts",
          description: "Planned instant receipt generation with verifiable transaction records.",
          status: "planned",
        },
        {
          title: "Pending dues alerts",
          description: "Planned reminders to guardians regarding upcoming fee schedules.",
          status: "planned",
        },
      ],
    },
    {
      id: "academics",
      name: "Exams & Gradebook",
      category: "Academics",
      tagline: "Planned assessment management with configurable grading schemes.",
      overview:
        "Designed to help academic coordinators record exam scores, evaluate grading weightages, and prepare student report cards.",
      status: "planned",
      highlights: [
        {
          title: "Configurable grading scales",
          description:
            "Planned custom grade boundaries and evaluation parameters tailored to school policy.",
          status: "planned",
        },
        {
          title: "Report card generation",
          description: "Planned standardized printable and digital student progress reports.",
          status: "planned",
        },
        {
          title: "Term score registers",
          description: "Planned cumulative grade tracking across academic evaluation terms.",
          status: "planned",
        },
      ],
    },
    {
      id: "directory",
      name: "Student & Staff Directory",
      category: "Administration",
      tagline: "Planned unified directory with role-based access controls.",
      overview:
        "Designed to maintain clean institutional records for students, guardians, faculty, and administrative personnel.",
      status: "planned",
      highlights: [
        {
          title: "Role-based access",
          description:
            "Planned permissions model ensuring staff only access records appropriate to their role.",
          status: "planned",
        },
        {
          title: "Student profile records",
          description:
            "Planned centralized profiles for contact details, guardian info, and enrollment history.",
          status: "planned",
        },
        {
          title: "Staff management",
          description: "Planned directory of teaching faculty and school administrative personnel.",
          status: "planned",
        },
      ],
    },
    {
      id: "communication",
      name: "School Notices & Communications",
      category: "Engagement",
      tagline: "Planned announcement workflows for parents and faculty.",
      overview:
        "Designed to deliver important school notices, circulars, and emergency bulletins directly to families.",
      status: "planned",
      highlights: [
        {
          title: "Broadcast announcements",
          description:
            "Planned school-wide broadcast messaging for urgent notices and general circulars.",
          status: "planned",
        },
        {
          title: "Classroom updates",
          description: "Planned targeted updates from teachers to specific class sections.",
          status: "planned",
        },
        {
          title: "Parent messaging archive",
          description: "Planned searchable history of school circulars and notifications.",
          status: "planned",
        },
      ],
    },
    {
      id: "insights",
      name: "Operational Reports & Insights",
      category: "Management",
      tagline: "Planned visual summaries of school operational metrics.",
      overview:
        "Designed to give school leadership calm, visual summaries of daily attendance trends and operational health.",
      status: "planned",
      highlights: [
        {
          title: "Visual operational summaries",
          description:
            "Planned dashboards highlighting attendance patterns and operational progress.",
          status: "planned",
        },
        {
          title: "Exportable data registers",
          description: "Planned spreadsheet exports for administrative compliance and audit needs.",
          status: "planned",
        },
        {
          title: "Leadership overview",
          description:
            "Planned multi-metric executive summary for school principals and management.",
          status: "planned",
        },
      ],
    },
  ],
};
