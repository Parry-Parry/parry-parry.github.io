---
layout: page
title: Dashboard
---

<div class="container">
    <h1>Workstation Usage</h1>
    <table>
        <thead>
            <tr>
                <th>System ID</th>
                <th>GPU ID</th>
                <th>Most Recent Utilization</th>
            </tr>
        </thead>
        <tbody id="data-table">
        </tbody>
    </table>
</div>

<script src="{{ 'assets/js/dashboard.js' | relative_url }}"></script>