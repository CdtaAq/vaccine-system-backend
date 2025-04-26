import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Reports = () => {
  const svgRef = useRef();
  
  const data = {
    ageDistribution: [
      { ageGroup: '18-25', vaccinated: 1200 },
      { ageGroup: '26-35', vaccinated: 3000 },
      { ageGroup: '36-45', vaccinated: 2500 },
      { ageGroup: '46-60', vaccinated: 1500 },
      { ageGroup: '60+', vaccinated: 800 },
    ],
    genderDistribution: [
      { gender: 'Male', vaccinated: 6000 },
      { gender: 'Female', vaccinated: 5500 },
    ],
    diseaseDistribution: [
      { disease: 'Hypertension', vaccinated: 1000 },
      { disease: 'Diabetes', vaccinated: 1200 },
      { disease: 'Heart Disease', vaccinated: 600 },
      { disease: 'None', vaccinated: 8000 },
    ],
  };

  useEffect(() => {
    drawBarChart();
    drawPieChart();
  }, []);

  const drawBarChart = () => {
    const width = 500;
    const height = 300;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleBand()
      .domain(data.ageDistribution.map(d => d.ageGroup))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data.ageDistribution, d => d.vaccinated)])
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(data.ageDistribution)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.ageGroup))
      .attr('y', d => yScale(d.vaccinated))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.vaccinated))
      .attr('fill', 'steelblue');

    svg.append('g')
      .selectAll('.axis')
      .data([xScale, yScale])
      .enter()
      .append('g')
      .attr('transform', (d, i) => (i === 0 ? `translate(0, ${height})` : ''))
      .call(d => d === xScale ? d3.axisBottom(d) : d3.axisLeft(d));
  };

  const drawPieChart = () => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie().value(d => d.vaccinated);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select('#pieChart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pieChartData = pie(data.genderDistribution);

    svg.selectAll('.slice')
      .data(pieChartData)
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', d => color(d.data.gender));

    svg.selectAll('.label')
      .data(pieChartData)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(d => `${d.data.gender}: ${d.data.vaccinated}`);
  };

  return (
    <div>
      <h2>Vaccination Reports</h2>

      <div>
        <h3>Age Distribution</h3>
        <svg ref={svgRef}></svg>
      </div>

      <div>
        <h3>Gender Distribution (Pie Chart)</h3>
        <svg id="pieChart"></svg>
      </div>

      <div>
        <h3>Disease Distribution</h3>
        <ul>
          {data.diseaseDistribution.map((d, index) => (
            <li key={index}>{d.disease}: {d.vaccinated} vaccinated</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
