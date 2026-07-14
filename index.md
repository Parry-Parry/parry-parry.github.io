---
layout: default
---

I am an Engineer at Bloomberg LP and a 4th year PhD Candidate at the [University of Glasgow](https://www.gla.ac.uk/) working within the IR group. I am supervised by [Dr Debasis Ganguly](https://gdebasis.github.io/) and [Dr Sean MacAvaney](https://macavaney.us/). My work is currently supported by the Bloomberg PhD [Data Science Fellowship](https://www.bloomberg.com/company/stories/introducing-the-seventh-cohort-of-bloomberg-data-science-ph-d-fellows-2024-2025). My research interests are primarily in Information Retrieval. Before my PhD I completed my honours degree in Computer Science at Glasgow.

My thesis is focused on the structure of ad-hoc ranking systems and how we can incorporate broader features in semantic interactions. A relatively up to date CV can be found [here]({{ '/assets/pdf/cv.pdf' | relative_url }}). Reach out on Twitter or by email if you want to chat about research or code. I'm generally interested in collaborations centred around modern IR evaluation and anything neural IR.

<h2>Contact</h2>

<ul>
<li>Email: <a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
<li>GitHub: <a href="https://github.com/{{ site.github_username }}">{{ site.github_username }}</a></li>
<li>Google Scholar: <a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}">{{ site.scholar_userid }}</a></li>
<li>ORCID: <a href="https://orcid.org/{{ site.orcid_id }}">{{ site.orcid_id }}</a></li>
</ul>

<h2>Software</h2>

<p><code><a href="https://github.com/Parry-Parry/rankers">rankers</a></code>: Training neural retrievers.</p>
<p><code><a href="https://github.com/Parry-Parry/MechIR">MechIR</a></code>: Mechanistic interpretability in information retrieval.</p>
<p><code><a href="https://github.com/Parry-Parry/suiteeval">suiteeval</a></code>: IR evaluation suites in PyTerrier.</p>
<p><code><a href="https://github.com/terrierteam/pyterrier_rag">terrierteam/pyterrier_rag</a></code>: Retrieval-augmented generation for the PyTerrier ecosystem.</p>

<h2>News</h2>

<table>
<tbody>
{% assign items = site.news | sort: 'date' | reverse %}
{% for item in items limit: 10 %}
<tr>
<td>{{ item.date | date: "%Y-%m-%d" }}</td>
<td>{{ item.content | strip_html | strip }}</td>
</tr>
{% endfor %}
</tbody>
</table>
