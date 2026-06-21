// ============================================================
//  ALL CONTENT DATA
// ============================================================

const LESSONS = [
  // ---- BASICS ----
  {
    id: 0, tab: "basics",
    title: "What is a Table?",
    difficulty: "easy",
    desc: "Rows, columns, and how data is stored in SQL",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
    content: `
<h2>What is a Table?</h2>
<p>In SQL, all data lives in <strong>tables</strong>. Think of a table like a spreadsheet: it has rows and columns, and each cell holds one piece of information.</p>
<h3>Columns & Rows</h3>
<p>Each <strong>column</strong> defines a category of data (like <code>name</code> or <code>age</code>). Each <strong>row</strong> is one record — one student, one order, one product.</p>
<pre><span class="cmt">-- The "students" table</span>
<span class="kw">id</span>  | <span class="kw">name</span>   | <span class="kw">age</span> | <span class="kw">major</span>
----|--------|-----|----------
  1 | Ana    |  20 | CS
  2 | Ben    |  22 | Math
  3 | Clara  |  21 | CS</pre>
<h3>Primary Key</h3>
<p>Every table usually has a <strong>primary key</strong> — a column (often called <code>id</code>) that uniquely identifies each row. No two rows can share the same primary key value.</p>
<div class="note">💡 A database is a collection of many related tables. SQL is the language you use to ask questions and make changes to those tables.</div>
<h3>Data Types</h3>
<p>Each column has a data type. Common types include:</p>
<ul>
  <li><code>INT</code> — whole numbers (1, 42, 100)</li>
  <li><code>TEXT</code> / <code>VARCHAR</code> — strings ("Ana", "CS")</li>
  <li><code>DECIMAL</code> — numbers with decimals (3.14)</li>
  <li><code>DATE</code> — calendar dates (2024-01-15)</li>
</ul>
`,
    practice: { q: "Which part of a table represents one single record?", options: ["A column", "A row", "A primary key", "A database"], answer: 1, explain: "Each row (also called a record or tuple) represents one entry. A column is a category, and the primary key is a unique identifier." }
  },
  {
    id: 1, tab: "basics",
    title: "SELECT Statement",
    difficulty: "easy",
    desc: "Retrieve all data from a table with SELECT",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    content: `
<h2>The SELECT Statement</h2>
<p>The most fundamental SQL operation is <code>SELECT</code>. It retrieves data from a table.</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students;</pre>
<p>Breaking this down:</p>
<ul>
  <li><code>SELECT</code> — tell SQL you want to retrieve data</li>
  <li><code>*</code> — the wildcard: "give me all columns"</li>
  <li><code>FROM students</code> — which table to read from</li>
</ul>
<h3>Sample Output</h3>
<pre><span class="kw">id</span>  | <span class="kw">name</span>   | <span class="kw">age</span> | <span class="kw">major</span>
----|--------|-----|------
  1 | Ana    |  20 | CS
  2 | Ben    |  22 | Math
  3 | Clara  |  21 | CS</pre>
<div class="note">💡 SQL is <em>not</em> case-sensitive for keywords. <code>select * from students</code> works too, but uppercase keywords are a widely used convention for readability.</div>
<h3>Semicolons</h3>
<p>A semicolon <code>;</code> at the end marks the end of a statement. Always include it when running multiple queries — it separates them.</p>
`,
    practice: { q: "What does the * (asterisk) mean in SELECT *?", options: ["Select zero columns", "Select only the first column", "Select all columns", "Select a random sample"], answer: 2, explain: "The asterisk * is a wildcard meaning 'all columns'. It's a shorthand so you don't have to name every column." }
  },
  {
    id: 2, tab: "basics",
    title: "Selecting Columns",
    difficulty: "easy",
    desc: "Choose specific columns instead of all (*)",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
    content: `
<h2>Selecting Specific Columns</h2>
<p>Using <code>*</code> returns everything, but often you only want a few columns. Just list them by name, separated by commas:</p>
<pre><span class="kw">SELECT</span> name, age <span class="kw">FROM</span> students;</pre>
<pre><span class="kw">name</span>   | <span class="kw">age</span>
--------|----
Ana     |  20
Ben     |  22
Clara   |  21</pre>
<h3>Column Aliases with AS</h3>
<p>Rename a column in your output using <code>AS</code>:</p>
<pre><span class="kw">SELECT</span> name <span class="kw">AS</span> student_name,
       age  <span class="kw">AS</span> years_old
<span class="kw">FROM</span> students;</pre>
<p>The alias only changes the column name in the <em>result</em> — the actual table is unchanged.</p>
<h3>Expressions in SELECT</h3>
<p>You can include calculations directly:</p>
<pre><span class="kw">SELECT</span> name, age + <span class="val">1</span> <span class="kw">AS</span> next_birthday
<span class="kw">FROM</span> students;</pre>
<div class="note">💡 Picking only the columns you need is good practice — it makes queries faster on large tables and your results easier to read.</div>
`,
    practice: { q: "What does the AS keyword do in a SELECT query?", options: ["Joins two tables", "Filters rows by condition", "Renames a column in the output", "Selects all columns"], answer: 2, explain: "AS creates an alias — a temporary label for the column in the result set. The original table is not modified." }
  },

  // ---- FILTERING ----
  {
    id: 3, tab: "filtering",
    title: "WHERE Clause",
    difficulty: "easy",
    desc: "Filter rows using conditions",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    content: `
<h2>Filtering with WHERE</h2>
<p>To filter which rows are returned, add a <code>WHERE</code> clause after <code>FROM</code>:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> age > <span class="val">20</span>;</pre>
<p>Only rows where <code>age</code> is greater than 20 are returned.</p>
<h3>Comparison Operators</h3>
<pre><span class="kw">=</span>    equal to
<span class="kw"><></span>   not equal to
<span class="kw">></span>    greater than
<span class="kw"><</span>    less than
<span class="kw">>=</span>   greater than or equal
<span class="kw"><=</span>   less than or equal</pre>
<h3>Text Comparisons</h3>
<p>For strings, use single quotes:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> major = <span class="str">'CS'</span>;</pre>
<h3>NULL Values</h3>
<p>Use <code>IS NULL</code> or <code>IS NOT NULL</code> to check for missing values — you can't use <code>=</code> with NULL:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> major <span class="kw">IS NOT NULL</span>;</pre>
`,
    practice: { q: "Which query returns only students in the 'Math' major?", options: ["SELECT * FROM students WHERE major == 'Math'", "SELECT * FROM students WHERE major = 'Math'", "SELECT * FROM students FILTER major = 'Math'", "SELECT major FROM students"], answer: 1, explain: "SQL uses a single = for equality in WHERE clauses, not == like Python or JavaScript." }
  },
  {
    id: 4, tab: "filtering",
    title: "AND / OR / NOT",
    difficulty: "medium",
    desc: "Combine multiple filter conditions",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
    content: `
<h2>Combining Conditions</h2>
<p>Use logical operators to chain multiple conditions in your <code>WHERE</code> clause:</p>
<h3>AND — both conditions must be true</h3>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> age > <span class="val">20</span> <span class="kw">AND</span> major = <span class="str">'CS'</span>;</pre>
<h3>OR — at least one condition is true</h3>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> age < <span class="val">20</span> <span class="kw">OR</span> major = <span class="str">'Math'</span>;</pre>
<h3>NOT — inverts a condition</h3>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE NOT</span> major = <span class="str">'CS'</span>;</pre>
<h3>Parentheses for grouping</h3>
<p>Parentheses control evaluation order, just like in math:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">WHERE</span> (major = <span class="str">'CS'</span> <span class="kw">OR</span> major = <span class="str">'Math'</span>)
  <span class="kw">AND</span> age > <span class="val">20</span>;</pre>
<h3>BETWEEN and IN</h3>
<pre><span class="kw">WHERE</span> age <span class="kw">BETWEEN</span> <span class="val">18</span> <span class="kw">AND</span> <span class="val">22</span>   <span class="cmt">-- inclusive range</span>
<span class="kw">WHERE</span> major <span class="kw">IN</span> (<span class="str">'CS'</span>, <span class="str">'Math'</span>)  <span class="cmt">-- match any value in list</span></pre>
`,
    practice: { q: "Which query returns CS students who are older than 21?", options: ["WHERE major='CS' OR age>21", "WHERE major='CS' AND age>21", "WHERE major='CS' NOT age<=21", "WHERE age>21"], answer: 1, explain: "AND requires BOTH conditions to be true simultaneously. OR would return CS students of any age plus non-CS students over 21." }
  },
  {
    id: 5, tab: "filtering",
    title: "ORDER BY & LIMIT",
    difficulty: "easy",
    desc: "Sort results and control how many rows you get",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/></svg>`,
    content: `
<h2>Sorting & Limiting Results</h2>
<p>By default SQL returns rows in no guaranteed order. Use <code>ORDER BY</code> to sort them:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">ORDER BY</span> age <span class="kw">ASC</span>;  <span class="cmt">-- youngest first</span>

<span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">ORDER BY</span> name <span class="kw">DESC</span>; <span class="cmt">-- Z → A</span></pre>
<p><code>ASC</code> (ascending) is the default — you can omit it. <code>DESC</code> reverses the order.</p>
<h3>Sorting by multiple columns</h3>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">ORDER BY</span> major <span class="kw">ASC</span>, age <span class="kw">DESC</span>;</pre>
<p>Rows are sorted by <code>major</code> first. Within the same major, sorted by <code>age</code> descending.</p>
<h3>LIMIT — cap the result</h3>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> students
<span class="kw">ORDER BY</span> age <span class="kw">DESC</span>
<span class="kw">LIMIT</span> <span class="val">3</span>; <span class="cmt">-- top 3 oldest</span></pre>
<div class="note">💡 <strong>Query execution order:</strong> FROM → WHERE → ORDER BY → LIMIT. Write them in that order and SQL processes them correctly.</div>
`,
    practice: { q: "What does ORDER BY name DESC return?", options: ["Names sorted A to Z", "Names sorted Z to A", "Names filtered by 'desc' keyword", "Only one row named 'desc'"], answer: 1, explain: "DESC means descending. For text, descending = Z before A. ASC (or nothing) gives A before Z." }
  },

  // ---- JOINS ----
  {
    id: 6, tab: "joins",
    title: "INNER JOIN",
    difficulty: "medium",
    desc: "Combine rows from two tables that match",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="12" r="7"/><circle cx="15" cy="12" r="7"/></svg>`,
    content: `
<h2>INNER JOIN</h2>
<p>A <code>JOIN</code> combines data from two tables into one result. <code>INNER JOIN</code> only returns rows where a match exists in <em>both</em> tables.</p>
<pre><span class="kw">SELECT</span> students.name, grades.grade
<span class="kw">FROM</span> students
<span class="kw">INNER JOIN</span> grades
  <span class="kw">ON</span> students.id = grades.student_id;</pre>
<p>The <code>ON</code> clause tells SQL how the tables are connected — here, <code>students.id</code> must match <code>grades.student_id</code>.</p>
<h3>Using table aliases</h3>
<p>Alias tables with short names to avoid typing the full name every time:</p>
<pre><span class="kw">SELECT</span> s.name, g.grade
<span class="kw">FROM</span> students <span class="kw">AS</span> s
<span class="kw">INNER JOIN</span> grades <span class="kw">AS</span> g
  <span class="kw">ON</span> s.id = g.student_id;</pre>
<h3>What gets excluded?</h3>
<p>Students with no grades are excluded. Grades with no matching student are excluded. INNER JOIN keeps only the intersection.</p>
<div class="note">💡 Think of INNER JOIN like a Venn diagram — it returns only the overlapping middle section.</div>
`,
    practice: { q: "INNER JOIN returns rows from...", options: ["Only the left table", "Only the right table", "Both tables where a match exists", "All rows from both tables"], answer: 2, explain: "INNER JOIN only returns rows where the ON condition is satisfied in BOTH tables. Unmatched rows from either table are dropped." }
  },
  {
    id: 7, tab: "joins",
    title: "LEFT JOIN",
    difficulty: "medium",
    desc: "Keep all rows from the left table",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="12" r="7" fill="currentColor" fill-opacity=".15"/><circle cx="9" cy="12" r="7"/><circle cx="15" cy="12" r="7"/></svg>`,
    content: `
<h2>LEFT JOIN</h2>
<p>A <code>LEFT JOIN</code> keeps <em>all</em> rows from the left (first) table, even if there's no matching row in the right table.</p>
<pre><span class="kw">SELECT</span> s.name, g.grade
<span class="kw">FROM</span> students <span class="kw">AS</span> s
<span class="kw">LEFT JOIN</span> grades <span class="kw">AS</span> g
  <span class="kw">ON</span> s.id = g.student_id;</pre>
<h3>What happens when there's no match?</h3>
<p>If a student has no grade, they still appear in the result — the <code>grade</code> column will be <code>NULL</code>:</p>
<pre><span class="kw">name</span>   | <span class="kw">grade</span>
--------|------
Ana     |    90
Ben     |    88
Clara   |    92
Diego   |  <span class="cmt">NULL</span>  <span class="cmt">← no grade yet</span></pre>
<h3>When to use LEFT JOIN</h3>
<p>Use <code>LEFT JOIN</code> when you want a complete list from one table and optionally include related data. For example: all students and their grades (if any).</p>
<div class="note">💡 You can find rows with no match by filtering: <code>WHERE g.student_id IS NULL</code> — this gives you students who have no grades.</div>
`,
    practice: { q: "In a LEFT JOIN, what appears for left-table rows with no match?", options: ["The row is dropped", "NULL in right-table columns", "0 for numeric columns", "An error is thrown"], answer: 1, explain: "LEFT JOIN preserves every left-table row. When no match is found in the right table, those columns are filled with NULL." }
  },
  {
    id: 8, tab: "joins",
    title: "JOIN Types Overview",
    difficulty: "hard",
    desc: "FULL OUTER, RIGHT, CROSS joins compared",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="12" r="6"/><circle cx="16" cy="12" r="6"/><line x1="12" y1="6" x2="12" y2="18"/></svg>`,
    content: `
<h2>All JOIN Types</h2>
<p>There are four main JOIN types. Each controls which rows survive the combination:</p>
<h3>INNER JOIN</h3>
<pre><span class="kw">FROM</span> a <span class="kw">INNER JOIN</span> b <span class="kw">ON</span> a.id = b.id
<span class="cmt">-- Only rows with a match in both tables</span></pre>
<h3>LEFT JOIN</h3>
<pre><span class="kw">FROM</span> a <span class="kw">LEFT JOIN</span> b <span class="kw">ON</span> a.id = b.id
<span class="cmt">-- All of 'a', plus matching rows from 'b' (NULL if no match)</span></pre>
<h3>RIGHT JOIN</h3>
<pre><span class="kw">FROM</span> a <span class="kw">RIGHT JOIN</span> b <span class="kw">ON</span> a.id = b.id
<span class="cmt">-- All of 'b', plus matching rows from 'a' (NULL if no match)</span></pre>
<h3>FULL OUTER JOIN</h3>
<pre><span class="kw">FROM</span> a <span class="kw">FULL OUTER JOIN</span> b <span class="kw">ON</span> a.id = b.id
<span class="cmt">-- All rows from both tables, NULLs where no match</span></pre>
<h3>CROSS JOIN</h3>
<pre><span class="kw">FROM</span> a <span class="kw">CROSS JOIN</span> b
<span class="cmt">-- Every combination of rows (no ON clause needed)</span>
<span class="cmt">-- 5 rows × 4 rows = 20 result rows</span></pre>
<div class="note">💡 In practice, INNER JOIN and LEFT JOIN cover 95% of real-world use cases. RIGHT JOIN can always be rewritten as a LEFT JOIN by switching the table order.</div>
`,
    practice: { q: "Which JOIN type returns all rows from both tables, with NULLs where there's no match?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], answer: 3, explain: "FULL OUTER JOIN is the union of LEFT and RIGHT JOIN — every row from both tables appears, with NULLs filled in for the non-matching side." }
  },

  // ---- AGGREGATES ----
  {
    id: 9, tab: "aggregates",
    title: "COUNT, SUM, AVG",
    difficulty: "medium",
    desc: "Compute totals and averages across rows",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
    content: `
<h2>Aggregate Functions</h2>
<p>Aggregate functions compute a single result from multiple rows. They summarize your data.</p>
<h3>COUNT</h3>
<pre><span class="kw">SELECT COUNT</span>(*) <span class="kw">FROM</span> students;
<span class="cmt">-- Returns: 5 (total number of rows)</span>

<span class="kw">SELECT COUNT</span>(major) <span class="kw">FROM</span> students;
<span class="cmt">-- Returns: non-NULL major values only</span></pre>
<h3>SUM</h3>
<pre><span class="kw">SELECT SUM</span>(credits) <span class="kw">FROM</span> courses;
<span class="cmt">-- Returns: 13 (total credits)</span></pre>
<h3>AVG</h3>
<pre><span class="kw">SELECT AVG</span>(age) <span class="kw">FROM</span> students;
<span class="cmt">-- Returns: 21.0 (mean average)</span></pre>
<h3>MIN and MAX</h3>
<pre><span class="kw">SELECT MIN</span>(age), <span class="kw">MAX</span>(age) <span class="kw">FROM</span> students;
<span class="cmt">-- Returns: 19, 23</span></pre>
<div class="note">💡 <code>COUNT(*)</code> counts all rows including NULLs. <code>COUNT(column)</code> counts only non-NULL values in that specific column.</div>
`,
    practice: { q: "What does COUNT(*) return?", options: ["Sum of all numeric values", "Average of all values", "Total number of rows", "Maximum value in the table"], answer: 2, explain: "COUNT(*) counts all rows in the result set, including rows with NULL values. It simply tells you how many rows exist." }
  },
  {
    id: 10, tab: "aggregates",
    title: "GROUP BY",
    difficulty: "medium",
    desc: "Group rows and apply aggregate functions per group",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    content: `
<h2>GROUP BY</h2>
<p><code>GROUP BY</code> clusters rows that share a value, then lets you apply aggregate functions to each cluster.</p>
<pre><span class="kw">SELECT</span> major, <span class="kw">COUNT</span>(*) <span class="kw">AS</span> student_count
<span class="kw">FROM</span> students
<span class="kw">GROUP BY</span> major;</pre>
<pre><span class="kw">major</span>   | <span class="kw">student_count</span>
---------|-------------
CS       |            3
Math     |            2</pre>
<h3>The rule: SELECT must match GROUP BY</h3>
<p>Every column in <code>SELECT</code> must either appear in <code>GROUP BY</code>, or be wrapped in an aggregate function:</p>
<pre><span class="cmt">-- ✅ Valid</span>
<span class="kw">SELECT</span> major, <span class="kw">COUNT</span>(*), <span class="kw">AVG</span>(age)
<span class="kw">FROM</span> students
<span class="kw">GROUP BY</span> major;

<span class="cmt">-- ❌ Invalid — 'name' is not in GROUP BY or aggregated</span>
<span class="kw">SELECT</span> name, major, <span class="kw">COUNT</span>(*)
<span class="kw">FROM</span> students
<span class="kw">GROUP BY</span> major;</pre>
<div class="note">💡 You can GROUP BY multiple columns: <code>GROUP BY major, age</code> creates a group for each unique combination.</div>
`,
    practice: { q: "What is wrong with: SELECT name, COUNT(*) FROM students?", options: ["Nothing, it's perfectly valid", "COUNT(*) cannot be used without WHERE", "'name' must appear in GROUP BY", "You must use SELECT *"], answer: 2, explain: "When using aggregate functions, every non-aggregated column in SELECT must be listed in GROUP BY. Since 'name' isn't grouped, SQL doesn't know which name to show per group." }
  },
  {
    id: 11, tab: "aggregates",
    title: "HAVING Clause",
    difficulty: "hard",
    desc: "Filter groups after GROUP BY — like WHERE for groups",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>`,
    content: `
<h2>HAVING Clause</h2>
<p><code>HAVING</code> filters groups <em>after</em> they are formed by <code>GROUP BY</code>. It's like <code>WHERE</code> but for groups rather than individual rows.</p>
<pre><span class="kw">SELECT</span> major, <span class="kw">COUNT</span>(*) <span class="kw">AS</span> count
<span class="kw">FROM</span> students
<span class="kw">GROUP BY</span> major
<span class="kw">HAVING COUNT</span>(*) > <span class="val">2</span>;</pre>
<p>This returns only majors that have more than 2 students.</p>
<h3>WHERE vs HAVING</h3>
<pre><span class="cmt">-- WHERE filters rows BEFORE grouping</span>
<span class="kw">SELECT</span> major, <span class="kw">COUNT</span>(*)
<span class="kw">FROM</span> students
<span class="kw">WHERE</span> age > <span class="val">18</span>      <span class="cmt">← runs first</span>
<span class="kw">GROUP BY</span> major
<span class="kw">HAVING COUNT</span>(*) > <span class="val">1</span>; <span class="cmt">← runs after grouping</span></pre>
<h3>Full query order</h3>
<pre><span class="kw">SELECT</span>   ...
<span class="kw">FROM</span>     ...
<span class="kw">WHERE</span>    ...   <span class="cmt">-- filter rows</span>
<span class="kw">GROUP BY</span> ...   <span class="cmt">-- form groups</span>
<span class="kw">HAVING</span>   ...   <span class="cmt">-- filter groups</span>
<span class="kw">ORDER BY</span> ...   <span class="cmt">-- sort</span>
<span class="kw">LIMIT</span>    ...   <span class="cmt">-- cap rows</span></pre>
`,
    practice: { q: "When should you use HAVING instead of WHERE?", options: ["When filtering text values", "When filtering individual rows before grouping", "When filtering groups after GROUP BY", "When joining more than two tables"], answer: 2, explain: "HAVING filters aggregated groups. WHERE filters individual rows before GROUP BY runs. You can't use aggregate functions like COUNT() in a WHERE clause." }
  },

  // ---- ADVANCED ----
  {
    id: 12, tab: "advanced",
    title: "Subqueries",
    difficulty: "hard",
    desc: "Use one query inside another query",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h4"/><path d="M15 13l3 3-3 3"/></svg>`,
    content: `
<h2>Subqueries</h2>
<p>A <strong>subquery</strong> is a query nested inside another query. It lets one query use the result of another query.</p>
<h3>Subquery in WHERE</h3>
<pre><span class="kw">SELECT</span> name, age
<span class="kw">FROM</span> students
<span class="kw">WHERE</span> age > (
  <span class="kw">SELECT AVG</span>(age)
  <span class="kw">FROM</span> students
);</pre>
<p>The inner query finds the average age. The outer query returns students older than that average.</p>
<h3>Subquery with IN</h3>
<pre><span class="kw">SELECT</span> name
<span class="kw">FROM</span> students
<span class="kw">WHERE</span> id <span class="kw">IN</span> (
  <span class="kw">SELECT</span> student_id
  <span class="kw">FROM</span> grades
  <span class="kw">WHERE</span> grade >= <span class="val">90</span>
);</pre>
<p>This finds students who have at least one grade of 90 or higher.</p>
<div class="note">Use a subquery when the filter depends on another result, such as an average, maximum, or list of related IDs.</div>
`,
    practice: { q: "What is a subquery?", options: ["A query inside another query", "A renamed table", "A type of JOIN", "A database backup"], answer: 0, explain: "A subquery is nested inside another SQL statement and supplies a value, row set, or filter list for the outer query." }
  },
  {
    id: 13, tab: "advanced",
    title: "EXISTS",
    difficulty: "hard",
    desc: "Test whether a related row exists",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/></svg>`,
    content: `
<h2>EXISTS</h2>
<p><code>EXISTS</code> checks whether a subquery returns at least one row. It answers a yes/no question for each row in the outer query.</p>
<pre><span class="kw">SELECT</span> s.name
<span class="kw">FROM</span> students <span class="kw">AS</span> s
<span class="kw">WHERE EXISTS</span> (
  <span class="kw">SELECT</span> <span class="val">1</span>
  <span class="kw">FROM</span> grades <span class="kw">AS</span> g
  <span class="kw">WHERE</span> g.student_id = s.id
);</pre>
<p>This returns students who have at least one grade row.</p>
<h3>NOT EXISTS</h3>
<pre><span class="kw">SELECT</span> s.name
<span class="kw">FROM</span> students <span class="kw">AS</span> s
<span class="kw">WHERE NOT EXISTS</span> (
  <span class="kw">SELECT</span> <span class="val">1</span>
  <span class="kw">FROM</span> grades <span class="kw">AS</span> g
  <span class="kw">WHERE</span> g.student_id = s.id
);</pre>
<p>This returns students with no grade rows.</p>
<div class="note"><code>EXISTS</code> is often clearer than <code>IN</code> when you are checking related rows across tables.</div>
`,
    practice: { q: "What does EXISTS test?", options: ["Whether a table has an index", "Whether a subquery returns at least one row", "Whether a column is unique", "Whether a query is sorted"], answer: 1, explain: "EXISTS returns true when the subquery finds at least one matching row. NOT EXISTS reverses that check." }
  },
  {
    id: 14, tab: "advanced",
    title: "CASE Expressions",
    difficulty: "hard",
    desc: "Create conditional labels in query results",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h16"/><path d="M17 10l3 2-3 2"/></svg>`,
    content: `
<h2>CASE Expressions</h2>
<p><code>CASE</code> lets you add conditional logic to a query result. It works like an if/else chain.</p>
<pre><span class="kw">SELECT</span>
  name,
  grade,
  <span class="kw">CASE</span>
    <span class="kw">WHEN</span> grade >= <span class="val">90</span> <span class="kw">THEN</span> <span class="str">'Excellent'</span>
    <span class="kw">WHEN</span> grade >= <span class="val">80</span> <span class="kw">THEN</span> <span class="str">'Good'</span>
    <span class="kw">WHEN</span> grade >= <span class="val">70</span> <span class="kw">THEN</span> <span class="str">'Passing'</span>
    <span class="kw">ELSE</span> <span class="str">'Needs work'</span>
  <span class="kw">END AS</span> grade_label
<span class="kw">FROM</span> grades;</pre>
<h3>Why CASE is useful</h3>
<p>Use <code>CASE</code> to turn raw values into readable labels, bucket values into ranges, or calculate conditional summaries.</p>
<pre><span class="kw">SELECT</span>
  <span class="kw">CASE</span>
    <span class="kw">WHEN</span> credits >= <span class="val">4</span> <span class="kw">THEN</span> <span class="str">'Heavy'</span>
    <span class="kw">ELSE</span> <span class="str">'Standard'</span>
  <span class="kw">END AS</span> course_load,
  <span class="kw">COUNT</span>(*) <span class="kw">AS</span> count
<span class="kw">FROM</span> courses
<span class="kw">GROUP BY</span> course_load;</pre>
<div class="note">Always end a CASE expression with <code>END</code>. Add <code>AS alias</code> so the output column has a useful name.</div>
`,
    practice: { q: "What is the purpose of CASE in SQL?", options: ["Create conditional output values", "Create a database table", "Force a JOIN to match", "Delete duplicate rows"], answer: 0, explain: "CASE evaluates conditions in order and returns a value for the first matching condition, with ELSE as the fallback." }
  },
  {
    id: 15, tab: "advanced",
    title: "Keys & Constraints",
    difficulty: "hard",
    desc: "Protect data integrity with database rules",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M15 4l2 2M13 8l2 2"/></svg>`,
    content: `
<h2>Keys & Constraints</h2>
<p>Constraints are rules the database enforces so your data stays valid.</p>
<h3>Primary Key</h3>
<pre><span class="kw">CREATE TABLE</span> students (
  id <span class="kw">INT PRIMARY KEY</span>,
  name <span class="kw">VARCHAR</span>(<span class="val">100</span>) <span class="kw">NOT NULL</span>
);</pre>
<p>A primary key uniquely identifies each row. It cannot be duplicated or NULL.</p>
<h3>Foreign Key</h3>
<pre><span class="kw">CREATE TABLE</span> grades (
  student_id <span class="kw">INT</span>,
  course_id <span class="kw">INT</span>,
  grade <span class="kw">INT</span>,
  <span class="kw">FOREIGN KEY</span> (student_id) <span class="kw">REFERENCES</span> students(id)
);</pre>
<p>A foreign key connects one table to another table's primary key.</p>
<h3>Common constraints</h3>
<ul>
  <li><code>NOT NULL</code> - value is required</li>
  <li><code>UNIQUE</code> - no duplicate values</li>
  <li><code>CHECK</code> - value must pass a rule</li>
  <li><code>DEFAULT</code> - use a fallback value if none is provided</li>
</ul>
<div class="note">Constraints belong to database design. They prevent bad data from entering your tables in the first place.</div>
`,
    practice: { q: "What does a foreign key do?", options: ["Sorts a table automatically", "Links a column to a key in another table", "Encrypts a column", "Counts rows in a table"], answer: 1, explain: "A foreign key stores values that reference another table's primary key, creating a relationship between tables." }
  },
  {
    id: 16, tab: "advanced",
    title: "Indexes & Views",
    difficulty: "hard",
    desc: "Speed up searches and save reusable query shapes",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16M4 12h16M4 19h16"/><path d="M8 5v14"/></svg>`,
    content: `
<h2>Indexes & Views</h2>
<p>Indexes and views are database tools that help with performance and organization.</p>
<h3>Indexes</h3>
<p>An index helps the database find rows faster, especially when filtering or joining by a column.</p>
<pre><span class="kw">CREATE INDEX</span> idx_students_major
<span class="kw">ON</span> students (major);</pre>
<p>Indexes make reads faster, but they can make inserts and updates slower because the index must also be maintained.</p>
<h3>Views</h3>
<p>A view is a saved query that acts like a virtual table.</p>
<pre><span class="kw">CREATE VIEW</span> student_grades <span class="kw">AS</span>
<span class="kw">SELECT</span> s.name, c.name <span class="kw">AS</span> course, g.grade
<span class="kw">FROM</span> students s
<span class="kw">JOIN</span> grades g <span class="kw">ON</span> s.id = g.student_id
<span class="kw">JOIN</span> courses c <span class="kw">ON</span> c.id = g.course_id;</pre>
<p>After that, you can query the view:</p>
<pre><span class="kw">SELECT</span> * <span class="kw">FROM</span> student_grades;</pre>
<div class="note">Use indexes for frequently searched columns. Use views to reuse complex SELECT queries and simplify reporting.</div>
`,
    practice: { q: "What is a SQL view?", options: ["A saved SELECT query used like a virtual table", "A physical backup of a database", "An index on every table", "A command that deletes rows"], answer: 0, explain: "A view stores a query definition. It does not usually store its own data; it presents data from underlying tables." }
  },
  {
    id: 18, tab: "advanced",
    title: "INSERT Statements",
    difficulty: "medium",
    desc: "Add new rows to tables with proper data types",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>`,
    content: `
<h2>INSERT INTO</h2>
<p>The <code>INSERT INTO</code> statement adds new rows to a table. You provide the column names and values for the new record.</p>
<h3>Basic Syntax</h3>
<pre><span class="kw">INSERT INTO</span> table_name (col1, col2, col3)
<span class="kw">VALUES</span> (<span class="val">'value1'</span>, <span class="val">100</span>, <span class="str">'2024-01-15'</span>);</pre>
<h3>Multiple Rows</h3>
<p>You can insert multiple rows in one statement:</p>
<pre><span class="kw">INSERT INTO</span> students (name, age, major)
<span class="kw">VALUES</span>
  (<span class="str">'Frank'</span>, <span class="val">20</span>, <span class="str">'History'</span>),
  (<span class="str">'Grace'</span>, <span class="val">21</span>, <span class="str">'Art'</span>),
  (<span class="str">'Henry'</span>, <span class="val">22</span>, <span class="str">'Chemistry'</span>);</pre>
<h3>Column Order and Defaults</h3>
<p>You don't have to list every column. Unlisted columns use their DEFAULT value (if defined) or NULL:</p>
<pre><span class="kw">INSERT INTO</span> students (name, age)
<span class="kw">VALUES</span> (<span class="str">'Ivy'</span>, <span class="val">23</span>);</pre>
<p>If the <code>major</code> column has a DEFAULT value, it's used. Otherwise, <code>major</code> is NULL.</p>
<div class="note">💡 Always match data types. String values go in quotes. Numbers and dates don't. Use NULL for missing values only if the column allows it.</div>
`,
    practice: { q: "Which is correct syntax for inserting two rows?", options: ["INSERT INTO t VALUES (1,2) (3,4)", "INSERT INTO t (a,b) VALUES (1,2), (3,4)", "INSERT INTO t VALUES 1,2 AND 3,4", "INSERT t (a,b) 1,2 | 3,4"], answer: 1, explain: "Multiple rows use parentheses around each set of values, separated by commas." }
  },
  {
    id: 19, tab: "advanced",
    title: "UPDATE & DELETE Statements",
    difficulty: "medium",
    desc: "Modify and remove rows from a table",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    content: `
<h2>UPDATE and DELETE</h2>
<p><code>UPDATE</code> modifies existing rows. <code>DELETE</code> removes them entirely.</p>
<h3>UPDATE Syntax</h3>
<pre><span class="kw">UPDATE</span> students
<span class="kw">SET</span> age = <span class="val">21</span>, major = <span class="str">'Physics'</span>
<span class="kw">WHERE</span> id = <span class="val">3</span>;</pre>
<p>The WHERE clause is critical — without it, you update <em>every row</em> in the table!</p>
<h3>Update with Calculations</h3>
<pre><span class="kw">UPDATE</span> inventory
<span class="kw">SET</span> price = price * <span class="val">1.1</span>  <span class="cmt">-- 10% increase</span>
<span class="kw">WHERE</span> category = <span class="str">'electronics'</span>;</pre>
<h3>DELETE Syntax</h3>
<pre><span class="kw">DELETE FROM</span> students
<span class="kw">WHERE</span> age < <span class="val">18</span>;</pre>
<p>Again, the WHERE clause is essential. <code>DELETE FROM table;</code> with no WHERE deletes <em>all rows</em>.</p>
<h3>Safe Practices</h3>
<ul>
  <li>Always test your WHERE condition with a SELECT first to confirm which rows match.</li>
  <li>Make a backup before running DELETE on a production database.</li>
  <li>Use transactions to roll back if something goes wrong.</li>
</ul>
<div class="note">⚠️ <strong>Critical:</strong> Missing WHERE clauses in UPDATE and DELETE are common mistakes that cause data loss. Always double-check!</div>
`,
    practice: { q: "What happens if you run UPDATE table SET col=5 with no WHERE clause?", options: ["Nothing, the query fails", "Only the first row is updated", "Every row in the table is updated", "The table is deleted"], answer: 2, explain: "Without a WHERE clause, UPDATE affects all rows. This is why WHERE is critical for safe data modification." }
  }
];

// ============================================================
//  QUIZZES
// ============================================================
const QUIZZES = [
  {
    id: 0, title: "SELECT Basics", difficulty: "easy",
    desc: "Test your knowledge of SELECT, FROM, and column aliases",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    questions: [
      { q: "What keyword retrieves data from a table?", opts: ["FETCH","GET","SELECT","RETRIEVE"], a: 2, exp: "SELECT is the standard SQL keyword for reading data. It's always paired with FROM to specify the table." },
      { q: "What does SELECT * return?", opts: ["First row only","All rows and all columns","Column names only","All columns of the first row"], a: 1, exp: "The asterisk * is a wildcard for 'all columns'. Combined with no WHERE clause, it returns every row and column." },
      { q: "How do you select only 'name' and 'age'?", opts: ["SELECT ALL name, age","SELECT name AND age FROM t","SELECT name, age FROM t","GET name, age FROM t"], a: 2, exp: "List column names separated by commas after SELECT. The FROM clause follows with the table name." },
      { q: "What does AS do in a query?", opts: ["Filters rows by condition","Joins two tables together","Renames a column in the output","Selects additional tables"], a: 2, exp: "AS creates an alias — a temporary label for the column shown in results. The underlying table is unchanged." },
      { q: "Which is valid SQL syntax?", opts: ["GET * FROM students","FETCH ALL FROM students","SELECT * FROM students","READ students ALL"], a: 2, exp: "SELECT * FROM table_name is the fundamental SQL retrieval syntax. Every SQL database supports it." }
    ]
  },
  {
    id: 1, title: "WHERE & Filters", difficulty: "easy",
    desc: "Filtering rows, comparisons, LIKE, IN, and BETWEEN",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    questions: [
      { q: "What symbol means 'not equal to' in SQL?", opts: ["!=","<>","=/=","NOT EQ"], a: 1, exp: "<> is the standard SQL 'not equal' operator. Many databases also accept != but <> is universally supported." },
      { q: "How do you filter students with age exactly 20?", opts: ["WHERE age == 20","WHERE age = 20","WHERE age IS 20","FILTER age = 20"], a: 1, exp: "SQL uses a single = for equality in WHERE clauses. The == syntax is from other programming languages." },
      { q: "BETWEEN 10 AND 20 is equivalent to:", opts: ["< 10 AND > 20","<= 10 OR >= 20",">= 10 AND <= 20","> 10 AND < 20"], a: 2, exp: "BETWEEN is inclusive on both ends, equivalent to >= lower_bound AND <= upper_bound." },
      { q: "The pattern LIKE '%son' matches:", opts: ["Words starting with 'son'","Words with 'son' anywhere","Words ending with 'son'","Exact text 'son'"], a: 2, exp: "The % wildcard matches any sequence of characters. '%son' means: anything, then 'son' at the end." },
      { q: "IN ('CS', 'Math') is equivalent to:", opts: ["major = 'CS' AND major = 'Math'","major LIKE 'CS'","major = 'CS' OR major = 'Math'","NOT major = 'Other'"], a: 2, exp: "IN checks if a value matches any item in the list. It's shorthand for multiple OR conditions." }
    ]
  },
  {
    id: 2, title: "JOINs", difficulty: "medium",
    desc: "INNER JOIN, LEFT JOIN, ON clauses, and NULL behavior",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="12" r="7"/><circle cx="15" cy="12" r="7"/></svg>`,
    questions: [
      { q: "INNER JOIN returns...", opts: ["All rows from left table","All rows from right table","Only rows with a match in both","All rows from both tables"], a: 2, exp: "INNER JOIN keeps only rows where the ON condition is met in both tables. Unmatched rows from either side are excluded." },
      { q: "In a LEFT JOIN with no match, the right-table columns show...", opts: ["An error","The row is removed","NULL","0 for numeric columns"], a: 2, exp: "LEFT JOIN keeps all left rows. When no match exists in the right table, right-table columns are filled with NULL." },
      { q: "Which clause defines the matching condition for a JOIN?", opts: ["WHERE","USING","ON","AS"], a: 2, exp: "The ON clause specifies how the two tables relate — typically matching a foreign key to a primary key." },
      { q: "What does FULL OUTER JOIN return?", opts: ["Only matching rows","All left rows","All right rows","All rows from both tables, matched or not"], a: 3, exp: "FULL OUTER JOIN returns every row from both tables. Where no match exists, the non-matching side shows NULLs." },
      { q: "Which is a valid table alias usage?", opts: ["FROM students ORDER BY students.name","FROM students s WHERE s.age > 20","FROM students WHERE students.age > 20","SELECT * FROM s = students"], a: 1, exp: "You define an alias by writing it after the table name (FROM students s). You can then use 's' as a shorthand throughout the query." }
    ]
  },
  {
    id: 3, title: "Aggregates & GROUP BY", difficulty: "medium",
    desc: "COUNT, SUM, AVG, GROUP BY, and HAVING",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    questions: [
      { q: "What is the difference between COUNT(*) and COUNT(col)?", opts: ["No difference","COUNT(*) includes NULLs, COUNT(col) ignores them","COUNT(col) is always faster","COUNT(*) only counts distinct values"], a: 1, exp: "COUNT(*) counts all rows including those with NULL values. COUNT(column) only counts rows where that column is NOT NULL." },
      { q: "Which function returns the largest value in a column?", opts: ["LARGEST()","TOP()","MAX()","HIGH()"], a: 2, exp: "MAX(column) is a standard SQL aggregate function that returns the highest value in the specified column." },
      { q: "What does GROUP BY do?", opts: ["Sorts rows in a table","Joins tables together","Groups rows sharing the same value for aggregation","Filters rows before they are counted"], a: 2, exp: "GROUP BY clusters rows that share the same value into a group, so aggregate functions can be applied to each group separately." },
      { q: "Where does HAVING fit in a query?", opts: ["Before FROM","Before WHERE","After GROUP BY","Before SELECT"], a: 2, exp: "The correct order is: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT." },
      { q: "AVG(grade) returns...", opts: ["The highest grade","The sum of all grades","Total count of grade rows","The mean average of all grades"], a: 3, exp: "AVG() computes the arithmetic mean: it sums all non-NULL values and divides by the count of non-NULL values." }
    ]
  },
  {
    id: 4, title: "Subqueries & EXISTS", difficulty: "hard",
    desc: "Nested SELECT statements, IN, EXISTS, and NOT EXISTS",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h4"/><path d="M15 13l3 3-3 3"/></svg>`,
    questions: [
      { q: "What does a subquery do?", opts: ["Runs outside SQL","Nests one query inside another query","Creates a new database engine","Sorts rows permanently"], a: 1, exp: "A subquery is a SELECT statement inside another SQL statement. The outer query can use its result." },
      { q: "Which query pattern finds values from a list returned by another query?", opts: ["WHERE col IN (SELECT ...)","WHERE col JOIN (SELECT ...)","ORDER BY (SELECT ...)","GROUP BY IN"], a: 0, exp: "IN can compare a column to a set of values returned by a subquery." },
      { q: "EXISTS returns true when...", opts: ["The database exists","The subquery returns at least one row","A column is indexed","A table has a primary key"], a: 1, exp: "EXISTS checks row existence. It is true if the subquery finds at least one matching row." },
      { q: "What does NOT EXISTS commonly find?", opts: ["Rows with no related match","Rows with duplicate values","Rows sorted descending","Rows with every column selected"], a: 0, exp: "NOT EXISTS is useful for anti-joins, such as finding students without any grades." },
      { q: "Which is usually clearer for checking related rows?", opts: ["EXISTS with a correlated subquery","ORDER BY with LIMIT","COUNT(*) in SELECT only","SELECT DISTINCT *"], a: 0, exp: "EXISTS directly expresses that you only care whether a related row is present, not how many values are returned." }
    ]
  },
  {
    id: 5, title: "CASE & Constraints", difficulty: "hard",
    desc: "Conditional output, primary keys, foreign keys, and rules",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h16"/><path d="M17 10l3 2-3 2"/></svg>`,
    questions: [
      { q: "What does CASE do in SELECT?", opts: ["Adds conditional output values","Creates an index","Deletes unmatched rows","Forces all rows to be unique"], a: 0, exp: "CASE evaluates conditions and returns different values depending on which condition matches first." },
      { q: "Which keyword closes a CASE expression?", opts: ["STOP","DONE","END","CLOSE"], a: 2, exp: "CASE expressions are closed with END, often followed by AS alias for the output column name." },
      { q: "What is a primary key?", opts: ["A value that may be duplicated","A column or set of columns that uniquely identifies a row","A query shortcut","A filter condition"], a: 1, exp: "A primary key uniquely identifies each row and cannot be NULL." },
      { q: "What does a foreign key enforce?", opts: ["A relationship to a referenced table","Alphabetical sorting","Automatic backups","Faster SELECT * queries"], a: 0, exp: "A foreign key ensures values in one table correspond to valid key values in another table." },
      { q: "Which constraint requires a value to be present?", opts: ["UNIQUE","DEFAULT","NOT NULL","CHECK"], a: 2, exp: "NOT NULL prevents a column from storing missing values." }
    ]
  },
  {
    id: 6, title: "INSERT, UPDATE, DELETE", difficulty: "medium",
    desc: "Data modification: INSERT, UPDATE, DELETE statements and WHERE clauses",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    questions: [
      { q: "What is the basic syntax for inserting a row?", opts: ["INSERT table VALUES (...)","INSERT INTO table (cols) VALUES (...)","INSERT table SET col=val","ADD ROW to table"], a: 1, exp: "INSERT INTO table_name (columns) VALUES (values) is the standard syntax." },
      { q: "Which clause prevents UPDATE from changing all rows?", opts: ["FILTER","WHERE","HAVING","LIMIT"], a: 1, exp: "WHERE specifies which rows to update. Without it, all rows are affected." },
      { q: "What does DELETE FROM table; do?", opts: ["Removes the table structure","Deletes all rows from the table","Deletes one random row","Marks rows as deleted without removing them"], a: 1, exp: "DELETE FROM table; with no WHERE clause deletes every row. Backup first!" },
      { q: "How do you insert multiple rows at once?", opts: ["Multiple INSERT statements","VALUES (row1), (row2), (row3)","INSERT row1; INSERT row2;","SELECT * then COPY"], a: 1, exp: "You can pass multiple value sets separated by commas in a single INSERT statement." },
      { q: "How do you increase a price by 10% for all electronics?", opts: ["UPDATE inventory SET price = price + 10 WHERE category='electronics'","UPDATE inventory SET price = price * 1.1 WHERE category='electronics'","UPDATE electronics SET price + 0.1","UPDATE SET category=electronics AND price*1.1"], a: 1, exp: "Multiply by 1.1 to increase by 10%. Add would only add a fixed amount." }
    ]
  }
];

// ============================================================
//  CHALLENGES
// ============================================================
const CHALLENGES = [
  {
    id: 0, title: "List all students", difficulty: "easy",
    desc: "Write a query to retrieve every row and every column from the students table.",
    hint: "Use SELECT with the asterisk wildcard.",
    check: (rows) => rows.length === 5 && rows[0].hasOwnProperty('id') && rows[0].hasOwnProperty('name'),
    solution: "SELECT * FROM students;"
  },
  {
    id: 1, title: "Students over 20", difficulty: "easy",
    desc: "Get the name and age of all students who are older than 20.",
    hint: "Use SELECT with specific columns and a WHERE clause.",
    check: (rows) => rows.length === 3 && rows.every(r => r.age > 20) && rows[0].hasOwnProperty('name'),
    solution: "SELECT name, age FROM students WHERE age > 20;"
  },
  {
    id: 2, title: "CS students, sorted", difficulty: "easy",
    desc: "List all CS major students, ordered alphabetically by name.",
    hint: "Filter with WHERE and sort with ORDER BY.",
    check: (rows) => rows.length === 2 && rows.every(r => r.major === 'CS'),
    solution: "SELECT * FROM students WHERE major = 'CS' ORDER BY name ASC;"
  },
  {
    id: 3, title: "Top 3 oldest students", difficulty: "easy",
    desc: "Return the names of the 3 oldest students.",
    hint: "Sort by age descending and use LIMIT.",
    check: (rows) => rows.length === 3,
    solution: "SELECT name, age FROM students ORDER BY age DESC LIMIT 3;"
  },
  {
    id: 4, title: "Student grades", difficulty: "medium",
    desc: "Show each student's name alongside their grade. Students with no grade should still appear.",
    hint: "Use a LEFT JOIN between students and grades.",
    check: (rows) => rows.length >= 5 && rows.some(r => r.grade == null || r.grade === undefined),
    solution: "SELECT s.name, g.grade FROM students s LEFT JOIN grades g ON s.id = g.student_id;"
  },
  {
    id: 5, title: "Count per major", difficulty: "medium",
    desc: "Count how many students are in each major. Show the major name and count.",
    hint: "Use GROUP BY and COUNT(*).",
    check: (rows) => rows.length >= 2 && rows[0].hasOwnProperty('count'),
    solution: "SELECT major, COUNT(*) AS count FROM students GROUP BY major;"
  },
  {
    id: 6, title: "Average grade", difficulty: "medium",
    desc: "Find the average grade across all students in the grades table.",
    hint: "Use the AVG() aggregate function.",
    check: (rows) => rows.length === 1 && (rows[0].hasOwnProperty('avg_grade') || rows[0].hasOwnProperty('avg')),
    solution: "SELECT AVG(grade) AS avg_grade FROM grades;"
  },
  {
    id: 8, title: "Highest grade student", difficulty: "medium",
    desc: "Find the student with the highest grade in the grades table.",
    hint: "Use ORDER BY with DESC and LIMIT to get the top result.",
    check: (rows) => rows.length === 1 && rows[0].hasOwnProperty('name') && rows[0].grade === 95,
    solution: "SELECT s.name, g.grade FROM students s INNER JOIN grades g ON s.id = g.student_id ORDER BY g.grade DESC LIMIT 1;"
  },
  {
    id: 9, title: "Students with no grades", difficulty: "hard",
    desc: "Find all students who don't have any grades recorded.",
    hint: "Use LEFT JOIN and check for NULL values.",
    check: (rows) => rows.length >= 1 && rows[0].hasOwnProperty('name'),
    solution: "SELECT s.name FROM students s LEFT JOIN grades g ON s.id = g.student_id WHERE g.student_id IS NULL;"
  },
  {
    id: 10, title: "Courses sorted by credits", difficulty: "easy",
    desc: "List all courses ordered by credits from highest to lowest.",
    hint: "ORDER BY credits DESC",
    check: (rows) => rows.length >= 4 && rows[0].credits >= rows[rows.length - 1].credits,
    solution: "SELECT * FROM courses ORDER BY credits DESC;"
  },
  {
    id: 11, title: "Count grades per student", difficulty: "hard",
    desc: "Show each student's name and how many grades they have.",
    hint: "Use GROUP BY and COUNT() with a JOIN.",
    check: (rows) => rows.length >= 3 && rows[0].hasOwnProperty('grade_count'),
    solution: "SELECT s.name, COUNT(g.grade) AS grade_count FROM students s LEFT JOIN grades g ON s.id = g.student_id GROUP BY s.id, s.name;"
  },
  {
    id: 12, title: "Select with DISTINCT", difficulty: "medium",
    desc: "Get a list of unique majors in the students table.",
    hint: "Use DISTINCT to remove duplicates.",
    check: (rows) => rows.length <= 5 && rows.every(r => r.hasOwnProperty('major')),
    solution: "SELECT DISTINCT major FROM students;"
  },
  {
    id: 13, title: "Students between ages", difficulty: "medium",
    desc: "Find all students with age between 20 and 22 (inclusive).",
    hint: "Use BETWEEN ... AND in the WHERE clause.",
    check: (rows) => rows.length >= 2 && rows.every(r => r.age >= 20 && r.age <= 22),
    solution: "SELECT * FROM students WHERE age BETWEEN 20 AND 22;"
  }
];

// ============================================================
//  CHEAT SHEET
// ============================================================
const CHEATSHEET = [
  {
    category: "Basic Queries",
    rows: [
      { kw: "SELECT *", desc: "Retrieve all columns from a table" },
      { kw: "SELECT col1, col2", desc: "Retrieve specific columns only" },
      { kw: "FROM table_name", desc: "Specify the source table" },
      { kw: "col AS alias", desc: "Rename a column in the result output" },
      { kw: "DISTINCT", desc: "Remove duplicate rows from results" },
    ]
  },
  {
    category: "Filtering",
    rows: [
      { kw: "WHERE condition", desc: "Filter rows by a condition" },
      { kw: "=  <>  >  <  >=  <=", desc: "Comparison operators for numbers and text" },
      { kw: "AND / OR / NOT", desc: "Combine or negate conditions" },
      { kw: "BETWEEN a AND b", desc: "Value in an inclusive range" },
      { kw: "IN (v1, v2, ...)", desc: "Match any value in a list" },
      { kw: "LIKE 'A%'", desc: "Pattern match — % = any chars, _ = one char" },
      { kw: "IS NULL / IS NOT NULL", desc: "Check for missing values" },
    ]
  },
  {
    category: "Sorting & Limiting",
    rows: [
      { kw: "ORDER BY col ASC", desc: "Sort results ascending (default)" },
      { kw: "ORDER BY col DESC", desc: "Sort results descending" },
      { kw: "ORDER BY c1, c2", desc: "Sort by multiple columns" },
      { kw: "LIMIT n", desc: "Return at most n rows" },
      { kw: "OFFSET n", desc: "Skip the first n rows (pagination)" },
    ]
  },
  {
    category: "Joins",
    rows: [
      { kw: "INNER JOIN", desc: "Rows that match in both tables" },
      { kw: "LEFT JOIN", desc: "All left rows + matching right (NULL if none)" },
      { kw: "RIGHT JOIN", desc: "All right rows + matching left (NULL if none)" },
      { kw: "FULL OUTER JOIN", desc: "All rows from both tables" },
      { kw: "ON t1.col = t2.col", desc: "Condition linking the two tables" },
      { kw: "table AS alias", desc: "Short name for a table in the query" },
    ]
  },
  {
    category: "Aggregate Functions",
    rows: [
      { kw: "COUNT(*)", desc: "Count all rows (includes NULLs)" },
      { kw: "COUNT(col)", desc: "Count non-NULL values in a column" },
      { kw: "SUM(col)", desc: "Total of a numeric column" },
      { kw: "AVG(col)", desc: "Mean average of a numeric column" },
      { kw: "MIN(col) / MAX(col)", desc: "Smallest or largest value" },
    ]
  },
  {
    category: "Grouping",
    rows: [
      { kw: "GROUP BY col", desc: "Group rows with the same value for aggregation" },
      { kw: "HAVING condition", desc: "Filter groups after GROUP BY (use aggregate functions here)" },
    ]
  }
];

// ============================================================
//  SAMPLE DATABASE
// ============================================================
const DB = {
  students: [
    { id: 1, name: "Ana",   age: 20, major: "CS"      },
    { id: 2, name: "Ben",   age: 22, major: "Math"    },
    { id: 3, name: "Clara", age: 21, major: "CS"      },
    { id: 4, name: "Diego", age: 19, major: "Physics" },
    { id: 5, name: "Eva",   age: 23, major: "Math"    }
  ],
  courses: [
    { id: 1, name: "Intro to CS",      credits: 3, teacher: "Dr. Lee"   },
    { id: 2, name: "Calculus",          credits: 4, teacher: "Dr. Smith" },
    { id: 3, name: "Data Structures",  credits: 3, teacher: "Dr. Lee"   },
    { id: 4, name: "Linear Algebra",   credits: 3, teacher: "Dr. Smith" }
  ],
  grades: [
    { student_id: 1, course_id: 1, grade: 90 },
    { student_id: 1, course_id: 3, grade: 85 },
    { student_id: 2, course_id: 2, grade: 88 },
    { student_id: 3, course_id: 1, grade: 92 },
    { student_id: 3, course_id: 3, grade: 78 },
    { student_id: 4, course_id: 2, grade: 75 },
    { student_id: 5, course_id: 2, grade: 95 },
    { student_id: 5, course_id: 4, grade: 82 }
  ]
};

const SANDBOX_QUERIES = [
  { label: "SELECT * FROM students", sql: "SELECT * FROM students;" },
  { label: "SELECT * FROM courses",  sql: "SELECT * FROM courses;" },
  { label: "SELECT * FROM grades",   sql: "SELECT * FROM grades;" },
  { label: "Students WHERE age > 20", sql: "SELECT name, age FROM students\nWHERE age > 20;" },
  { label: "CS students only",        sql: "SELECT * FROM students\nWHERE major = 'CS';" },
  { label: "Students + grades (JOIN)", sql: "SELECT s.name, g.grade\nFROM students s\nINNER JOIN grades g ON s.id = g.student_id;" },
  { label: "All students + grades (LEFT)", sql: "SELECT s.name, g.grade\nFROM students s\nLEFT JOIN grades g ON s.id = g.student_id;" },
  { label: "Count per major",          sql: "SELECT major, COUNT(*) AS count\nFROM students\nGROUP BY major;" },
  { label: "Average grade",            sql: "SELECT AVG(grade) AS avg_grade\nFROM grades;" },
];

// ============================================================
//  EXAMS
// ============================================================
const EXAMS = [
  {
    id: 0, title: "SQL Exam 1", difficulty: "medium",
    desc: "Test your SQL skills: CREATE, ALTER, INSERT, SELECT, UPDATE, DELETE, DROP",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M8 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V3z"/><path d="m9 14 2 2 4-5"/></svg>`,
    sections: [
      {
        title: "CREATE TABLE (1–10)",
        instructions: "Write the correct SQL statement for each scenario.",
        questions: [
          {
            num: 1,
            scenario: "A hospital HR system needs to store nurse shift assignments including shift ID, nurse first name, last name, certification level, department ID, and hourly wage. Create a table named nurse_shifts.",
            answer: `CREATE TABLE nurse_shifts (
  shift_id INT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  certification_level VARCHAR(50),
  department_id INT,
  hourly_wage DECIMAL(8,2)
);`
          },
          {
            num: 2,
            scenario: "A logistics company needs to record drone delivery logs including flight ID, remaining battery capacity, payload weight, and delivery status. Create a table named drone_logs.",
            answer: `CREATE TABLE drone_logs (
  flight_id INT PRIMARY KEY,
  battery_capacity DECIMAL(5,2),
  payload_weight DECIMAL(8,2),
  delivery_status VARCHAR(50)
);`
          },
          {
            num: 3,
            scenario: "A marketing team needs to store promotional coupon codes, discount percentages, and expiration dates. Create a table named promo_codes.",
            answer: `CREATE TABLE promo_codes (
  code_id INT PRIMARY KEY,
  code VARCHAR(50),
  discount_percentage DECIMAL(5,2),
  expiration_date DATE
);`
          },
          {
            num: 4,
            scenario: "A marine research lab needs to store daily ocean readings including temperature, salinity, and GPS coordinates. Create a table named ocean_metrics.",
            answer: `CREATE TABLE ocean_metrics (
  metric_id INT PRIMARY KEY,
  temperature DECIMAL(5,2),
  salinity DECIMAL(5,2),
  gps_coordinates VARCHAR(100)
);`
          },
          {
            num: 5,
            scenario: "A property management company needs to track lease agreements including lease ID, square footage, monthly rent, and tenant contact information. Create a table named commercial_leases.",
            answer: `CREATE TABLE commercial_leases (
  lease_id INT PRIMARY KEY,
  square_footage DECIMAL(10,2),
  monthly_rent DECIMAL(10,2),
  tenant_contact VARCHAR(255)
);`
          },
          {
            num: 6,
            scenario: "A cybersecurity team needs a system logs table containing log ID, timestamp, event message, status, country origin, and user ID.",
            answer: `CREATE TABLE system_logs (
  log_id INT PRIMARY KEY,
  timestamp DATETIME,
  event_message TEXT,
  status VARCHAR(50),
  country_origin VARCHAR(100),
  user_id INT
);`
          },
          {
            num: 7,
            scenario: "A university database needs to store employee records including employee ID, performance rating, and years with company.",
            answer: `CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  performance_rating VARCHAR(50),
  years_with_company INT
);`
          },
          {
            num: 8,
            scenario: "A finance system needs to store account information including account ID, name, email, portfolio value, account type, and creation date.",
            answer: `CREATE TABLE accounts (
  account_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  portfolio_value DECIMAL(15,2),
  account_type VARCHAR(50),
  creation_date DATE
);`
          },
          {
            num: 9,
            scenario: "A law firm needs a client database storing client ID, name, retainer fee, and registration date.",
            answer: `CREATE TABLE clients (
  client_id INT PRIMARY KEY,
  name VARCHAR(100),
  retainer_fee DECIMAL(10,2),
  registration_date DATE
);`
          },
          {
            num: 10,
            scenario: "A retail system needs an inventory table with cost, price, available stock, threshold level, and quantity used.",
            answer: `CREATE TABLE inventory (
  product_id INT PRIMARY KEY,
  cost DECIMAL(10,2),
  price DECIMAL(10,2),
  available_stock INT,
  threshold_level INT,
  quantity_used INT
);`
          }
        ]
      },
      {
        title: "ALTER TABLE (11–20)",
        instructions: "Write the correct ALTER statement for each scenario.",
        questions: [
          {
            num: 11,
            scenario: "A store manager decides to rename the column cost to wholesale_price in the inventory table.",
            answer: "ALTER TABLE inventory RENAME COLUMN cost TO wholesale_price;"
          },
          {
            num: 12,
            scenario: "A banking system must add a new boolean column is_2fa_enabled to the user_profiles table.",
            answer: "ALTER TABLE user_profiles ADD COLUMN is_2fa_enabled BOOLEAN DEFAULT FALSE;"
          },
          {
            num: 13,
            scenario: "A university updates the students table so that phone numbers can now store up to 20 characters for international students.",
            answer: "ALTER TABLE students MODIFY COLUMN phone_number VARCHAR(20);"
          },
          {
            num: 14,
            scenario: "A social media platform removes the obsolete facebook_login_id column from the player_accounts table.",
            answer: "ALTER TABLE player_accounts DROP COLUMN facebook_login_id;"
          },
          {
            num: 15,
            scenario: "An airline database renames column carrier to aircraft_carrier in the aircraft table.",
            answer: "ALTER TABLE aircraft RENAME COLUMN carrier TO aircraft_carrier;"
          },
          {
            num: 16,
            scenario: "An airline maintenance system adds a new column last_rigorous_inspection_date to track aircraft inspections.",
            answer: "ALTER TABLE aircraft ADD COLUMN last_rigorous_inspection_date DATE;"
          },
          {
            num: 17,
            scenario: "A subscription service renames column plan to plan_type.",
            answer: "ALTER TABLE subscriptions RENAME COLUMN plan TO plan_type;"
          },
          {
            num: 18,
            scenario: "A subscription system adds a new column max_users to the subscriptions table.",
            answer: "ALTER TABLE subscriptions ADD COLUMN max_users INT DEFAULT 1;"
          },
          {
            num: 19,
            scenario: "A customer database removes a deprecated facebook_id column.",
            answer: "ALTER TABLE customers DROP COLUMN facebook_id;"
          },
          {
            num: 20,
            scenario: "A warehouse system renames column cost to wholesale_price again in another inventory table version.",
            answer: "ALTER TABLE warehouse_inventory RENAME COLUMN cost TO wholesale_price;"
          }
        ]
      },
      {
        title: "INSERT INTO (21–30)",
        instructions: "Write the INSERT statement for each scenario.",
        questions: [
          {
            num: 21,
            scenario: "A law firm signs a new corporate client 'Apex Corp' with a retainer fee of 5000 and registration date today. Insert into clients.",
            answer: "INSERT INTO clients (name, retainer_fee, registration_date) VALUES ('Apex Corp', 5000, CURDATE());"
          },
          {
            num: 22,
            scenario: "A hotel receptionist checks in a guest into Room 402 with guest ID 1024 and current timestamp.",
            answer: "INSERT INTO hotel_checkins (guest_id, room_number, checkin_time) VALUES (1024, 402, NOW());"
          },
          {
            num: 23,
            scenario: "A smart farm IoT sensor records soil moisture of 42% for sensor ID 12 with current time.",
            answer: "INSERT INTO sensor_readings (sensor_id, soil_moisture, reading_time) VALUES (12, 42.0, NOW());"
          },
          {
            num: 24,
            scenario: "A gym app logs a workout for member ID 804: 45 minutes, 350 calories burned.",
            answer: "INSERT INTO workouts (member_id, duration_minutes, calories_burned) VALUES (804, 45, 350);"
          },
          {
            num: 25,
            scenario: "A music platform adds a new track: 'Midnight Rain' by Luna Eclipse with duration 210 seconds.",
            answer: "INSERT INTO tracks (title, artist, duration_seconds) VALUES ('Midnight Rain', 'Luna Eclipse', 210);"
          },
          {
            num: 26,
            scenario: "A drone system logs a flight with flight ID 1 and battery 78.5%.",
            answer: "INSERT INTO flights (flight_id, battery_percentage) VALUES (1, 78.5);"
          },
          {
            num: 27,
            scenario: "A retail system adds a promo code 'SAVE20' with 20% discount and expiration date 2026-12-31.",
            answer: "INSERT INTO promo_codes (code, discount_percentage, expiration_date) VALUES ('SAVE20', 20.0, '2026-12-31');"
          },
          {
            num: 28,
            scenario: "An ocean sensor records salinity and temperature data with GPS coordinates.",
            answer: "INSERT INTO ocean_metrics (temperature, salinity, gps_coordinates) VALUES (22.5, 35.2, '40.7128,-74.0060');"
          },
          {
            num: 29,
            scenario: "A bank inserts a new account for John Doe with portfolio value 1,500,000.",
            answer: "INSERT INTO accounts (name, portfolio_value) VALUES ('John Doe', 1500000.00);"
          },
          {
            num: 30,
            scenario: "A company adds a new employee with ID 1042 and performance rating 'Excellent'.",
            answer: "INSERT INTO employees (employee_id, performance_rating) VALUES (1042, 'Excellent');"
          }
        ]
      },
      {
        title: "SELECT (31–40)",
        instructions: "Write the SELECT query for each scenario.",
        questions: [
          {
            num: 31,
            scenario: "A wealth manager wants all clients whose portfolio value exceeds 1,000,000.",
            answer: "SELECT * FROM accounts WHERE portfolio_value > 1000000;"
          },
          {
            num: 32,
            scenario: "An IT security analyst wants all failed system logs excluding domestic country records.",
            answer: "SELECT * FROM system_logs WHERE status = 'failed' AND country_origin != 'Domestic';"
          },
          {
            num: 33,
            scenario: "A corporate recruiter wants employees rated 'Excellent' with more than 3 years in company.",
            answer: "SELECT * FROM employees WHERE performance_rating = 'Excellent' AND years_with_company > 3;"
          },
          {
            num: 34,
            scenario: "A marketing team wants only first names and emails from customers for a newsletter.",
            answer: "SELECT first_name, email FROM customers;"
          },
          {
            num: 35,
            scenario: "A medical team wants patients over 60 who experienced 'Side Effect A'.",
            answer: "SELECT * FROM patients WHERE age > 60 AND side_effect = 'Side Effect A';"
          },
          {
            num: 36,
            scenario: "A quality control team checks all parts from batch 'AB-99' that passed inspection.",
            answer: "SELECT * FROM parts WHERE batch_id = 'AB-99' AND inspection_status = 'passed';"
          },
          {
            num: 37,
            scenario: "A marketing team filters promo codes with discount greater than 10%.",
            answer: "SELECT * FROM promo_codes WHERE discount_percentage > 10;"
          },
          {
            num: 38,
            scenario: "A marine scientist selects ocean records with high salinity levels.",
            answer: "SELECT * FROM ocean_metrics WHERE salinity > 35.0;"
          },
          {
            num: 39,
            scenario: "A warehouse manager finds products where stock is below threshold level.",
            answer: "SELECT * FROM inventory WHERE available_stock < threshold_level;"
          },
          {
            num: 40,
            scenario: "A developer retrieves all system logs regardless of condition.",
            answer: "SELECT * FROM system_logs;"
          }
        ]
      },
      {
        title: "UPDATE (41–45)",
        instructions: "Write the UPDATE statement for each scenario.",
        questions: [
          {
            num: 41,
            scenario: "A store applies a 15% discount to all electronics products.",
            answer: "UPDATE inventory SET price = price * 0.85 WHERE category = 'electronics';"
          },
          {
            num: 42,
            scenario: "An employee named Jane Doe changes her last name to Smith and updates email and department.",
            answer: "UPDATE employees SET last_name = 'Smith', email = 'jane.smith@company.com', department = 'HR' WHERE first_name = 'Jane' AND last_name = 'Doe';"
          },
          {
            num: 43,
            scenario: "A courier marks a shipment as Delivered and updates timestamp.",
            answer: "UPDATE shipments SET delivery_status = 'Delivered', delivery_timestamp = NOW() WHERE shipment_id = 1;"
          },
          {
            num: 44,
            scenario: "A customer deposits 500 into their bank account.",
            answer: "UPDATE accounts SET portfolio_value = portfolio_value + 500 WHERE account_id = 1;"
          },
          {
            num: 45,
            scenario: "A company upgrades client ID 88 to Enterprise plan with 100 max users.",
            answer: "UPDATE subscriptions SET plan_type = 'Enterprise', max_users = 100 WHERE client_id = 88;"
          }
        ]
      },
      {
        title: "DELETE + DROP (46–50)",
        instructions: "Write the DELETE or DROP statement for each scenario.",
        questions: [
          {
            num: 46,
            scenario: "A grocery store removes expired milk from inventory.",
            answer: "DELETE FROM inventory WHERE product_name = 'milk' AND expiration_date < CURDATE();"
          },
          {
            num: 47,
            scenario: "A customer cancels concert ticket TIX-7721.",
            answer: "DELETE FROM tickets WHERE ticket_id = 'TIX-7721';"
          },
          {
            num: 48,
            scenario: "A company removes an old log archive table from the database.",
            answer: "DROP TABLE log_archive;"
          },
          {
            num: 49,
            scenario: "A system decommissions a backup inventory table.",
            answer: "DROP TABLE backup_inventory;"
          },
          {
            num: 50,
            scenario: "A database administrator removes all test records from the users table.",
            answer: "DELETE FROM users WHERE user_type = 'test';"
          }
        ]
      }
    ]
  }
];

// ============================================================
//  EXAM SEEDS — per-question sample tables used by exam mode
//  to compute "Your Output" vs "Expected Output". CREATE TABLE
//  questions (1–10) need no seed since there's no prior data.
// ============================================================
const EXAM_SEEDS = {
  // ---- ALTER TABLE (11–20) ----
  11: { table: "inventory", columns: ["id","item_name","cost","quantity"], rows: [
    { id: 1, item_name: "Steel Bolts", cost: 12.50, quantity: 500 },
    { id: 2, item_name: "Copper Wire", cost: 34.00, quantity: 120 },
    { id: 3, item_name: "Aluminum Sheet", cost: 58.75, quantity: 75 }
  ]},
  12: { table: "user_profiles", columns: ["user_id","username","email"], rows: [
    { user_id: 1, username: "jdoe", email: "jdoe@bank.com" },
    { user_id: 2, username: "asmith", email: "asmith@bank.com" },
    { user_id: 3, username: "mlee", email: "mlee@bank.com" }
  ]},
  13: { table: "students", columns: ["student_id","name","phone_number"], rows: [
    { student_id: 1, name: "Liam Cruz", phone_number: "09171234567" },
    { student_id: 2, name: "Mia Santos", phone_number: "09281234567" },
    { student_id: 3, name: "Noah Reyes", phone_number: "+19171234567" }
  ]},
  14: { table: "player_accounts", columns: ["account_id","username","facebook_login_id"], rows: [
    { account_id: 1, username: "shadowblade", facebook_login_id: "fb_88210" },
    { account_id: 2, username: "nightfury", facebook_login_id: "fb_77310" },
    { account_id: 3, username: "ironclaw", facebook_login_id: "fb_99120" }
  ]},
  15: { table: "aircraft", columns: ["tail_number","model","carrier"], rows: [
    { tail_number: "PH-001", model: "Airbus A320", carrier: "SkyJet" },
    { tail_number: "PH-002", model: "Boeing 737", carrier: "PacWings" },
    { tail_number: "PH-003", model: "Airbus A330", carrier: "SkyJet" }
  ]},
  16: { table: "aircraft", columns: ["tail_number","model","status"], rows: [
    { tail_number: "PH-101", model: "Boeing 777", status: "Active" },
    { tail_number: "PH-102", model: "Airbus A350", status: "Active" },
    { tail_number: "PH-103", model: "Boeing 787", status: "Maintenance" }
  ]},
  17: { table: "subscriptions", columns: ["client_id","plan","price"], rows: [
    { client_id: 1, plan: "Basic", price: 9.99 },
    { client_id: 2, plan: "Pro", price: 29.99 },
    { client_id: 3, plan: "Basic", price: 9.99 }
  ]},
  18: { table: "subscriptions", columns: ["client_id","plan_type","price"], rows: [
    { client_id: 1, plan_type: "Starter", price: 15.00 },
    { client_id: 2, plan_type: "Growth", price: 45.00 },
    { client_id: 3, plan_type: "Starter", price: 15.00 }
  ]},
  19: { table: "customers", columns: ["customer_id","name","facebook_id"], rows: [
    { customer_id: 1, name: "Carla Dizon", facebook_id: "fb_5512" },
    { customer_id: 2, name: "Ramon Bautista", facebook_id: "fb_8821" },
    { customer_id: 3, name: "Teresa Lim", facebook_id: "fb_3390" }
  ]},
  20: { table: "warehouse_inventory", columns: ["sku","item_name","cost"], rows: [
    { sku: "WH-001", item_name: "Pallet Jack", cost: 450.00 },
    { sku: "WH-002", item_name: "Forklift Battery", cost: 1200.00 },
    { sku: "WH-003", item_name: "Shelving Unit", cost: 300.00 }
  ]},

  // ---- INSERT INTO (21–30) ----
  21: { table: "clients", columns: ["client_id","name","retainer_fee","registration_date"], rows: [
    { client_id: 1, name: "Bayview Legal", retainer_fee: 3000, registration_date: "2024-01-15" },
    { client_id: 2, name: "Solstice Holdings", retainer_fee: 4200, registration_date: "2024-03-02" }
  ]},
  22: { table: "hotel_checkins", columns: ["checkin_id","guest_id","room_number","checkin_time"], rows: [
    { checkin_id: 1, guest_id: 881, room_number: 210, checkin_time: "2026-06-19T14:00:00.000Z" },
    { checkin_id: 2, guest_id: 902, room_number: 305, checkin_time: "2026-06-19T16:30:00.000Z" }
  ]},
  23: { table: "sensor_readings", columns: ["reading_id","sensor_id","soil_moisture","reading_time"], rows: [
    { reading_id: 1, sensor_id: 5, soil_moisture: 38.2, reading_time: "2026-06-19T06:00:00.000Z" },
    { reading_id: 2, sensor_id: 9, soil_moisture: 55.0, reading_time: "2026-06-19T06:05:00.000Z" }
  ]},
  24: { table: "workouts", columns: ["workout_id","member_id","duration_minutes","calories_burned"], rows: [
    { workout_id: 1, member_id: 201, duration_minutes: 30, calories_burned: 220 },
    { workout_id: 2, member_id: 355, duration_minutes: 60, calories_burned: 480 }
  ]},
  25: { table: "tracks", columns: ["track_id","title","artist","duration_seconds"], rows: [
    { track_id: 1, title: "Golden Hour", artist: "Wave Theory", duration_seconds: 198 },
    { track_id: 2, title: "Static Bloom", artist: "Echo Lane", duration_seconds: 225 }
  ]},
  26: { table: "flights", columns: ["flight_id","battery_percentage"], rows: [
    { flight_id: 5, battery_percentage: 64.0 },
    { flight_id: 6, battery_percentage: 91.2 }
  ]},
  27: { table: "promo_codes", columns: ["code_id","code","discount_percentage","expiration_date"], rows: [
    { code_id: 1, code: "WELCOME10", discount_percentage: 10.0, expiration_date: "2026-09-30" },
    { code_id: 2, code: "SUMMER15", discount_percentage: 15.0, expiration_date: "2026-08-15" }
  ]},
  28: { table: "ocean_metrics", columns: ["metric_id","temperature","salinity","gps_coordinates"], rows: [
    { metric_id: 1, temperature: 19.8, salinity: 34.1, gps_coordinates: "34.0195,-118.4912" },
    { metric_id: 2, temperature: 21.0, salinity: 35.5, gps_coordinates: "36.7783,-119.4179" }
  ]},
  29: { table: "accounts", columns: ["account_id","name","portfolio_value"], rows: [
    { account_id: 1, name: "Maria Lopez", portfolio_value: 850000.00 },
    { account_id: 2, name: "Henry Tan", portfolio_value: 2300000.00 }
  ]},
  30: { table: "employees", columns: ["employee_id","performance_rating"], rows: [
    { employee_id: 1010, performance_rating: "Good" },
    { employee_id: 1021, performance_rating: "Satisfactory" }
  ]},

  // ---- SELECT (31–40) ----
  31: { table: "accounts", columns: ["account_id","name","portfolio_value"], rows: [
    { account_id: 1, name: "Maria Lopez", portfolio_value: 850000 },
    { account_id: 2, name: "Henry Tan", portfolio_value: 2300000 },
    { account_id: 3, name: "Wealth Trust Fund", portfolio_value: 5400000 },
    { account_id: 4, name: "Sam Cruz", portfolio_value: 420000 }
  ]},
  32: { table: "system_logs", columns: ["log_id","status","country_origin"], rows: [
    { log_id: 1, status: "failed", country_origin: "Russia" },
    { log_id: 2, status: "success", country_origin: "Domestic" },
    { log_id: 3, status: "failed", country_origin: "Domestic" },
    { log_id: 4, status: "failed", country_origin: "China" }
  ]},
  33: { table: "employees", columns: ["employee_id","performance_rating","years_with_company"], rows: [
    { employee_id: 1, performance_rating: "Excellent", years_with_company: 5 },
    { employee_id: 2, performance_rating: "Excellent", years_with_company: 2 },
    { employee_id: 3, performance_rating: "Good", years_with_company: 6 },
    { employee_id: 4, performance_rating: "Excellent", years_with_company: 4 }
  ]},
  34: { table: "customers", columns: ["customer_id","first_name","last_name","email"], rows: [
    { customer_id: 1, first_name: "Ana", last_name: "Cruz", email: "ana.cruz@mail.com" },
    { customer_id: 2, first_name: "Leo", last_name: "Reyes", email: "leo.reyes@mail.com" },
    { customer_id: 3, first_name: "Mika", last_name: "Tan", email: "mika.tan@mail.com" }
  ]},
  35: { table: "patients", columns: ["patient_id","age","side_effect"], rows: [
    { patient_id: 1, age: 65, side_effect: "Side Effect A" },
    { patient_id: 2, age: 58, side_effect: "Side Effect A" },
    { patient_id: 3, age: 72, side_effect: "Side Effect B" },
    { patient_id: 4, age: 81, side_effect: "Side Effect A" }
  ]},
  36: { table: "parts", columns: ["part_id","batch_id","inspection_status"], rows: [
    { part_id: 1, batch_id: "AB-99", inspection_status: "passed" },
    { part_id: 2, batch_id: "AB-99", inspection_status: "failed" },
    { part_id: 3, batch_id: "CD-12", inspection_status: "passed" },
    { part_id: 4, batch_id: "AB-99", inspection_status: "passed" }
  ]},
  37: { table: "promo_codes", columns: ["code_id","code","discount_percentage"], rows: [
    { code_id: 1, code: "WELCOME10", discount_percentage: 10 },
    { code_id: 2, code: "SUMMER15", discount_percentage: 15 },
    { code_id: 3, code: "FLASH25", discount_percentage: 25 }
  ]},
  38: { table: "ocean_metrics", columns: ["metric_id","salinity"], rows: [
    { metric_id: 1, salinity: 34.1 },
    { metric_id: 2, salinity: 35.5 },
    { metric_id: 3, salinity: 36.0 }
  ]},
  39: { table: "inventory", columns: ["product_id","available_stock","threshold_level"], rows: [
    { product_id: 1, available_stock: 12, threshold_level: 20 },
    { product_id: 2, available_stock: 50, threshold_level: 30 },
    { product_id: 3, available_stock: 5, threshold_level: 10 }
  ]},
  40: { table: "system_logs", columns: ["log_id","status","country_origin"], rows: [
    { log_id: 1, status: "success", country_origin: "Domestic" },
    { log_id: 2, status: "failed", country_origin: "Japan" },
    { log_id: 3, status: "success", country_origin: "Domestic" }
  ]},

  // ---- UPDATE (41–45) ----
  41: { table: "inventory", columns: ["product_id","name","category","price"], rows: [
    { product_id: 1, name: "Wireless Mouse", category: "electronics", price: 25.00 },
    { product_id: 2, name: "Office Chair", category: "furniture", price: 120.00 },
    { product_id: 3, name: "Bluetooth Speaker", category: "electronics", price: 60.00 }
  ]},
  42: { table: "employees", columns: ["employee_id","first_name","last_name","email","department"], rows: [
    { employee_id: 1, first_name: "Jane", last_name: "Doe", email: "jane.doe@company.com", department: "Sales" },
    { employee_id: 2, first_name: "Mark", last_name: "Lee", email: "mark.lee@company.com", department: "IT" }
  ]},
  43: { table: "shipments", columns: ["shipment_id","delivery_status","delivery_timestamp"], rows: [
    { shipment_id: 1, delivery_status: "In Transit", delivery_timestamp: null },
    { shipment_id: 2, delivery_status: "In Transit", delivery_timestamp: null }
  ]},
  44: { table: "accounts", columns: ["account_id","name","portfolio_value"], rows: [
    { account_id: 1, name: "Diane Cruz", portfolio_value: 10000 },
    { account_id: 2, name: "Mark Villar", portfolio_value: 25000 }
  ]},
  45: { table: "subscriptions", columns: ["client_id","plan_type","max_users"], rows: [
    { client_id: 88, plan_type: "Pro", max_users: 10 },
    { client_id: 90, plan_type: "Basic", max_users: 5 }
  ]},

  // ---- DELETE + DROP (46–50) ----
  46: { table: "inventory", columns: ["product_id","product_name","expiration_date"], rows: [
    { product_id: 1, product_name: "milk", expiration_date: "2026-06-10" },
    { product_id: 2, product_name: "milk", expiration_date: "2026-07-01" },
    { product_id: 3, product_name: "cheese", expiration_date: "2026-06-05" }
  ]},
  47: { table: "tickets", columns: ["ticket_id","event_name","status"], rows: [
    { ticket_id: "TIX-7721", event_name: "Summer Fest", status: "Confirmed" },
    { ticket_id: "TIX-7722", event_name: "Summer Fest", status: "Confirmed" }
  ]},
  48: { table: "log_archive", columns: ["log_id","created_at"], rows: [
    { log_id: 1, created_at: "2025-01-01" }
  ]},
  49: { table: "backup_inventory", columns: ["backup_id","snapshot_date"], rows: [
    { backup_id: 1, snapshot_date: "2025-06-01" }
  ]},
  50: { table: "users", columns: ["user_id","username","user_type"], rows: [
    { user_id: 1, username: "admin", user_type: "real" },
    { user_id: 2, username: "test_bot1", user_type: "test" },
    { user_id: 3, username: "jdoe", user_type: "real" },
    { user_id: 4, username: "test_bot2", user_type: "test" }
  ]}
};