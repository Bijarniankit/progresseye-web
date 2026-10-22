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
      name: "Attendance & Absence Engine",
      category: "Operations",
      tagline: "Planned roll call workflows with guardian absence alerts.",
      overview:
        "Planned design to support teachers in recording classroom attendance from desktop or mobile devices and alerting guardians of student absences.",
      status: "planned",
      highlights: [
        {
          title: "Planned classroom roll call",
          description:
            "Planned roll call interface designed for classroom recording without paper registers.",
          status: "planned",
        },
        {
          title: "Planned absence notifications",
          description:
            "Planned alerts sent to parents and guardians when a student is marked absent.",
          status: "planned",
        },
        {
          title: "Planned attendance registers",
          description:
            "Planned central records of attendance accessible to administrators and teachers.",
          status: "planned",
        },
      ],
    },
    {
      id: "fees",
      name: "Fee Collection & Receipts",
      category: "Finance",
      tagline: "Planned digital payment collection and receipt generation.",
      overview:
        "Planned design to support scheduled fee cycles, online payment intake, and clear payment records for parents and bursars.",
      status: "planned",
      highlights: [
        {
          title: "Planned digital payments",
          description: "Planned payment intake workflows supporting digital payment options.",
          status: "planned",
        },
        {
          title: "Planned digital receipts",
          description: "Planned receipt generation with verifiable transaction records.",
          status: "planned",
        },
        {
          title: "Planned fee schedule alerts",
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
        "Planned design to help academic coordinators record exam scores, evaluate grading weightages, and prepare student report cards.",
      status: "planned",
      highlights: [
        {
          title: "Planned grading configuration",
          description:
            "Planned grade boundaries and evaluation parameters tailored to school policy.",
          status: "planned",
        },
        {
          title: "Planned report cards",
          description: "Planned printable and digital student progress reports.",
          status: "planned",
        },
        {
          title: "Planned cumulative grade tracking",
          description: "Planned score registers across academic evaluation terms.",
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
        "Planned design to maintain clean institutional records for students, guardians, faculty, and administrative personnel.",
      status: "planned",
      highlights: [
        {
          title: "Planned access permissions",
          description:
            "Planned permissions model ensuring staff only access records appropriate to their role.",
          status: "planned",
        },
        {
          title: "Planned student records",
          description:
            "Planned centralized profiles for contact details, guardian info, and enrollment history.",
          status: "planned",
        },
        {
          title: "Planned staff directory",
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
        "Planned design to deliver school notices, circulars, and bulletins directly to families.",
      status: "planned",
      highlights: [
        {
          title: "Planned broadcast messaging",
          description:
            "Planned school-wide broadcast messaging for general circulars and announcements.",
          status: "planned",
        },
        {
          title: "Planned section updates",
          description: "Planned targeted updates from teachers to specific class sections.",
          status: "planned",
        },
        {
          title: "Planned notice archive",
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
        "Planned design to provide school leadership visual summaries of daily attendance trends and operational health.",
      status: "planned",
      highlights: [
        {
          title: "Planned operational dashboards",
          description:
            "Planned visual summaries highlighting attendance patterns and operational progress.",
          status: "planned",
        },
        {
          title: "Planned data exports",
          description: "Planned spreadsheet exports for administrative compliance and audit needs.",
          status: "planned",
        },
        {
          title: "Planned leadership summaries",
          description: "Planned executive overview for school principals and management.",
          status: "planned",
        },
      ],
    },
  ],
};
