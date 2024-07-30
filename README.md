<img width="1470" alt="Screenshot 2024-07-30 at 6 57 30 PM" src="https://github.com/user-attachments/assets/fd0dc723-260f-4ec6-a782-aa0ebbc8253d"># Job Scheduling Algorithms 📅

This repository contains various job scheduling algorithms commonly used in operating systems. These algorithms are essential for managing how processes are assigned to resources, such as CPU time, in a multitasking operating system.

## Overview

Job scheduling is a critical aspect of operating systems that ensures efficient execution of processes by managing their order of execution. This repository includes implementations of several key job scheduling algorithms.

## Algorithms Implemented

- **First-Come, First-Served (FCFS)**: Jobs are executed in the order they arrive.
- **Shortest Job Next (SJN)**: Jobs with the shortest execution time are selected next.
- **Priority Scheduling**: Jobs are executed based on their priority.
- **Round Robin (RR)**: Each job is assigned a fixed time slot in a cyclic order.
- **Multilevel Queue Scheduling**: Jobs are divided into multiple queues, each with its scheduling algorithm.
- **Multilevel Feedback Queue Scheduling**: Jobs can move between queues based on their behaviour and requirements.

## Installation

To run the algorithms locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vraj1510/Job-Scheduling-Algorithms.git
   cd Job-Scheduling-Algorithms

2. **Create a virtual environment and activate it (optional but recommended):**
   ```bash
   Run the HTML file

## Usage

```

Each script takes input in the form of job arrival times, burst times, and, if applicable, priorities. The output will display the order of execution and various performance metrics such as average waiting time and turnaround time.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- The contributors of various open-source libraries used in this project.

---
