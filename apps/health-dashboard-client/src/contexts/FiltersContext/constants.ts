import { FilterConfig } from "@core/health-dashboard";

export const filterWidgetConfig: FilterConfig[] = [
  {
    id: 'influencer',
    label: 'Influencers',
    options: [
      {
        value: 'kayla-itsines',
        label: 'Kayla Itsines',
        isSelected: false,
      },
      {
        value: 'andrew-huberman',
        label: 'Andrew Huberman',
        isSelected: false,
      },
      {
        value: 'dr-mikhail-varshavski',
        label: 'Dr. Mikhail Varshavski',
        isSelected: false,
      },
    ],
  },
  {
    id: 'category',
    label: 'Categories',
    options: [
      {
        value: 'cardiovascular-health',
        label: 'Cardiovascular Health',
        isSelected: false,
      },
      {
        value: 'education',
        label: 'Education',
        isSelected: false,
      },
      {
        value: 'fitness',
        label: 'Fitness',
        isSelected: false,
      },
      {
        value: 'mental-health',
        label: 'Mental Health',
        isSelected: false,
      },
      {
        value: 'nutrition',
        label: 'Nutrition',
        isSelected: false,
      },
      {
        value: 'training',
        label: 'Training',
        isSelected: false,
      },
      {
        value: 'other',
        label: 'Other',
        isSelected: false,
      },
    ],
  },
  {
    id: 'date',
    label: 'Dates',
    options: [],
  },
  {
    id: 'status',
    label: 'Status',
    options: [
      {
        value: 'confirmed',
        label: 'Confirmed',
        isSelected: false,
      },
      {
        value: 'questionable',
        label: 'Questionable',
        isSelected: false,
      },
      {
        value: 'debunked',
        label: 'Debunked',
        isSelected: false,
      },
      {
        value: 'unverified',
        label: 'Unverified',
        isSelected: false,
      },
    ],
  },
];