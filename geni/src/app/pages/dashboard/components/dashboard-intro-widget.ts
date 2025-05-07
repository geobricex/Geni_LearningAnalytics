import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-intro-widget',
  standalone: true,
  template: `
    <div class="p-6 bg-gray-900 rounded shadow text-white">
      <h2 class="text-2xl font-bold mb-2">Learning Analytics Platform</h2>
      <p class="text-gray-300">
        This platform helps visualize educational data from virtual learning environments.
      </p>
      <ul class="list-disc pl-5 mt-3 text-gray-400">
        <li><strong>Level 1:</strong> Academic performance.</li>
        <li><strong>Level 2:</strong> Adds student interaction data.</li>
        <li><strong>Level 3:</strong> Socioeconomic background integration.</li>
        <li><strong>Level 4:</strong> Behavior trends and predictive analysis.</li>
      </ul>
    </div>
  `
})
export class DashboardIntroWidget {}
