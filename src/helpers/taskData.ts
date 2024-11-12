// helpers/taskData.ts

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  boardId: number;
  statusId: number;
  assigneeId: number;
}

export const tasksData: TaskItem[] = [
  {
    id: 1,
    title: 'Design Landing Page',
    description: 'Create initial mockups for the landing page based on the brand guidelines.',
    createdAt: '2023-01-10',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 101,
  },
  {
    id: 2,
    title: 'Set Up Project Repo',
    description: 'Initialize the project repository and set up CI/CD pipeline.',
    createdAt: '2023-01-12',
    boardId: 1,
    statusId: 2, // In progress
    assigneeId: 102,
  },
  {
    id: 3,
    title: 'Write User Stories',
    description: 'Draft user stories for all major functionalities of the app.',
    createdAt: '2023-01-15',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 103,
  },
  {
    id: 4,
    title: 'Create Database Schema',
    description: 'Design and create the initial database schema for the application.',
    createdAt: '2023-01-20',
    boardId: 1,
    statusId: 2, // In progress
    assigneeId: 104,
  },
  {
    id: 5,
    title: 'Develop Authentication',
    description: 'Implement user authentication with JWT tokens and role-based access control.',
    createdAt: '2023-02-05',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 101,
  },
  {
    id: 6,
    title: 'Responsive Design Testing',
    description: 'Ensure the application is fully responsive across all devices.',
    createdAt: '2023-02-10',
    boardId: 1,
    statusId: 3, // Done
    assigneeId: 102,
  },
  {
    id: 7,
    title: 'Code Review for Module X',
    description: 'Perform a thorough code review for the recently completed Module X.',
    createdAt: '2023-02-15',
    boardId: 1,
    statusId: 3, // Done
    assigneeId: 103,
  },
  {
    id: 8,
    title: 'Optimize Database Queries',
    description: 'Identify and optimize slow queries in the application database.',
    createdAt: '2023-02-18',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 104,
  },
  {
    id: 9,
    title: 'Prepare Demo Presentation',
    description: 'Create slides and prepare a demo for the upcoming project presentation.',
    createdAt: '2023-02-25',
    boardId: 1,
    statusId: 2, // In progress
    assigneeId: 101,
  },
  {
    id: 10,
    title: 'Implement Payment Gateway',
    description: 'Integrate payment gateway for processing transactions in the app.',
    createdAt: '2023-03-01',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 102,
  },
  {
    id: 11,
    title: 'Fix Login Bug',
    description: 'Resolve the issue where users are unable to log in after a password reset.',
    createdAt: '2023-03-05',
    boardId: 1,
    statusId: 2, // In progress
    assigneeId: 103,
  },
  {
    id: 12,
    title: 'Deploy to Staging',
    description: 'Deploy the latest build to the staging environment for testing.',
    createdAt: '2023-03-10',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 104,
  },
  {
    id: 13,
    title: 'User Feedback Analysis',
    description: 'Analyze user feedback and identify areas for improvement.',
    createdAt: '2023-03-15',
    boardId: 1,
    statusId: 3, // Done
    assigneeId: 101,
  },
  {
    id: 14,
    title: 'Content Writing for Blog',
    description: 'Write content for the company blog about the latest product updates.',
    createdAt: '2023-03-20',
    boardId: 1,
    statusId: 2, // In progress
    assigneeId: 102,
  },
  {
    id: 15,
    title: 'Security Audit',
    description: 'Conduct a security audit to ensure there are no vulnerabilities in the application.',
    createdAt: '2023-03-25',
    boardId: 1,
    statusId: 1, // To do
    assigneeId: 103,
  },
  {
    id: 16,
    title: 'Finalize Product Roadmap',
    description: 'Develop the product roadmap for the next two quarters based on team input.',
    createdAt: '2023-03-28',
    boardId: 1,
    statusId: 3, // Done
    assigneeId: 104,
  },
];
