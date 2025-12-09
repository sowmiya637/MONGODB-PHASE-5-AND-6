
# MongoDB Learning Project — Phase 5: Indexing & Performance

## Overview

This phase focuses on **indexing in MongoDB** and how it affects **query performance**. Indexes are critical for optimizing read operations, especially on large datasets, and understanding when and how to use them is essential for database performance tuning.

---

## Objective

- Understand **different types of indexes** in MongoDB  
- Learn **how indexes affect query performance**  
- Measure and optimize **read/write operations**  
- Understand **trade-offs** of indexing and data modeling  

---

## Concepts

### 1. Indexing

- **Index:** A data structure that improves the speed of data retrieval operations on a database collection.  
- **How it works:** Instead of scanning all documents, MongoDB uses the index to quickly locate matching documents.  
- **Trade-off:** Indexes consume additional storage and slightly slow down write operations (inserts, updates, deletes).

### 2. Types of Indexes

1. **Single Field Index**
   - Indexes a single field in a collection.
   - Example: `users.email` → unique index ensures no duplicate emails.

2. **Compound Index**
   - Indexes multiple fields together.
   - Example: `role + email` → efficient for queries filtering by both role and email.

3. **Text Index**
   - Special index for string content to enable text search.
   - Example: `course.title + course.description` → supports full-text search with `$text`.

4. **Unique Index**
   - Ensures that indexed field values are unique across documents.

5. **Multikey Index**
   - Automatically created when indexing array fields.
   - Allows efficient querying of array elements.

6. **TTL (Time-to-Live) Index**
   - Automatically deletes documents after a certain time.

---

### 3. Query Optimization

- **Explain Plan:**  
  Use `db.collection.find(query).explain("executionStats")` to see whether a query uses an index.
- **Performance Measurement:**  
  Measure query execution time before and after creating indexes.
- **Embedded vs Referenced Documents:**  
  - Embedded: Faster reads for nested data but larger documents.  
  - Referenced: Smaller documents, may require `$lookup` and joins, slightly slower reads.

---

### 4. Indexing Best Practices

- Index fields used in **frequent queries**, **sorts**, and **joins**.  
- Avoid unnecessary indexes on fields that are rarely queried.  
- Use **compound indexes** wisely; order matters (prefix rule).  
- Monitor performance with `explain()` and real workloads.  
- Drop unused indexes to save space and improve writes.

---

## Tasks

1. Add a **unique index** on `users.email`  
2. Add a **compound index** on `role + email`  
3. Add a **text index** on `course.title + course.description`  
4. Measure query time **before and after indexes**  
5. Use `explain()` on slow queries to check **index usage**  
6. Compare performance of **embedded lessons** vs **referenced lessons**  
7. Identify a **slow query** and optimize it using indexes  
8. Simulate **1000+ users** and measure read/write performance  
9. Drop an index and observe **query slowdown**  
10. Document which queries **benefited most** and why  

---

## Outcome

- Learn **when indexes help** and when they don’t  
- Gain practical experience in **performance tuning**  
- Understand **trade-offs of embedded vs referenced data**  
- Build skills in **query analysis using explain plans**  

---

## References

- [MongoDB Indexes](https://www.mongodb.com/docs/manual/indexes/)  
- [MongoDB Explain Query Plan](https://www.mongodb.com/docs/manual/reference/explain-results/)  
- [MongoDB Performance Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)  

---

## Example Commands

### Create Unique Index
```js
db.users.createIndex({ email: 1 }, { unique: true })
````

### Create Compound Index

```js
db.users.createIndex({ role: 1, email: 1 })
```

### Create Text Index

```js
db.courses.createIndex({ title: "text", description: "text" })
```

### Check Query Execution

```js
db.courses.find({ title: /MongoDB/i }).explain("executionStats")
```

### Drop an Index

```js
db.users.dropIndex("email_1")
```
