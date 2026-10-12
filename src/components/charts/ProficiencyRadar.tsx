import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { mockTopicSkills } from '../../data/topicsData';

export const ProficiencyRadar: React.FC<{ height?: number }> = ({ height = 300 }) => {
  // Select 6-7 prominent topics for a clean radar visualization
  const data = mockTopicSkills.slice(0, 7).map(item => ({
    topic: item.topic,
    score: item.proficiencyScore,
    fullMark: 100
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
          <PolarAngleAxis
            dataKey="topic"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 9 }}
            stroke="rgba(255, 255, 255, 0.05)"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#f8fafc'
            }}
            formatter={(value: any) => [`${value}% Mastery`, 'Proficiency']}
          />
          <Radar
            name="Proficiency"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
