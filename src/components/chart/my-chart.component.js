import React, {useEffect, useState} from 'react';
import { Chart } from 'primereact/chart';

const MyChart = ({yes, no} : any) => {
    const [chartData, setChartData] = useState(null);
    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    useEffect(() => {
        setChartData({
            labels: ['Yes', 'No'],
            datasets: [
                {
                    data: [yes, no],
                    backgroundColor: [
                        "#4F46E5",
                        "#71717A"
                    ],
                    hoverBackgroundColor: [
                        "rgba(79,70,229,0.5)",
                        "rgba(113,113,122,0.5)"
                    ]
                }]
        });
    }, [yes, no]);

    return (
        <div key={yes + no} className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ margin: '0 auto', paddingBottom: '20px', position: 'relative', width: '20%' }} />
        </div>
    )
}

export default MyChart;