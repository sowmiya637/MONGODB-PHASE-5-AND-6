
# MongoDB Learning Project — Phase 6: Relationships

## Overview

This phase focuses on understanding **relationships in MongoDB**, including when to **embed documents**, when to **reference documents**, and how to use **population (`populate()`)** in Mongoose for querying related data efficiently.

---

## Objective

- Learn **data modeling strategies** for relational data in MongoDB  
- Understand **embedding vs referencing**  
- Use **population** to fetch related documents  
- Implement **cascading updates and deletes**  
- Learn **performance trade-offs** of different relationship approaches  

---

## Concepts

### 1. Embedding vs Referencing

**Embedding (Denormalization):**  
- Store related data directly inside a parent document.  
- Advantages:
  - Faster reads, fewer queries.  
  - Easier to fetch complete data in one query.  
- Disadvantages:
  - Document size grows quickly.  
  - Harder to update nested data frequently.

**Referencing (Normalization):**  
- Store related data in separate collections with IDs.  
- Advantages:
  - Keeps documents smaller and manageable.  
  - Easier to update related data independently.  
- Disadvantages:
  - Requires multiple queries or population.  
  - Slightly slower reads.

---

### 2. Population (`populate()` in Mongoose)

- Replaces a referenced ID with the actual document(s).  
- Can be **shallow** (one level) or **deep** (nested population).  
- Useful for joining collections without manual queries.  
- Example:
```js
Course.findById(courseId).populate('students')
````

---

### 3. Virtual Fields

* Fields computed dynamically but **not stored in the database**.
* Useful for calculations like **completion percentage** per course.
* Example:

```js
CourseSchema.virtual('completionPercentage').get(function() {
  return (this.completedLessons / this.totalLessons) * 100;
});
```

---

### 4. Cascading Operations

* **Cascading Delete:** Automatically remove related documents when a parent is deleted.
  Example: Delete a course → remove all enrollments for that course.

* **Cascading Update:** Automatically update related documents when parent data changes.
  Example: Change course instructor → update instructor info in enrollments.

---

### 5. Trade-offs

| Approach       | Pros                                    | Cons                                      |
| -------------- | --------------------------------------- | ----------------------------------------- |
| Embedding      | Fast reads, fewer queries               | Larger documents, update complexity       |
| Referencing    | Smaller docs, flexible updates          | More queries, slower reads                |
| Population     | Easy to fetch related documents         | Performance overhead if deeply nested     |
| Mixed approach | Balance between embedding & referencing | Must manage which data to embed/reference |

---

## Tasks

1. Implement **many-to-many relationship** between students and courses via Enrollment.
2. Fetch a course with **all enrolled students** using `populate()`.
3. Fetch **student progress for all courses** with nested `populate()`.
4. Compare performance of `populate()` vs **separate queries**.
5. Implement **cascading delete** (delete course → remove enrollments).
6. Implement **cascading update** (change course instructor → update related data).
7. Demonstrate the difference between **shallow** and **deep population**.
8. Add a **virtual field** to calculate completion percentage per course.
9. Experiment with storing some data **embedded** (like lessons) and some **referenced** (like enrollments) in the same document.
10. Document **trade-offs and reasoning** in the README.

---

## Outcome

* Learn **when to embed vs reference** documents
* Understand **how to use `populate()`** effectively
* Learn **cascading updates and deletes** for related data
* Understand **performance trade-offs** of different relationship strategies in MongoDB


## Example Commands

### Populate Enrolled Students

```js
Course.findById(courseId)
  .populate('students')
  .exec((err, course) => {
    console.log(course.students);
  });
```

### Cascading Delete Example

```js
Course.findByIdAndDelete(courseId, async () => {
  await Enrollment.deleteMany({ course: courseId });
});
```

### Virtual Field for Completion Percentage

```js
CourseSchema.virtual('completionPercentage').get(function() {
  return (this.completedLessons / this.totalLessons) * 100;
});
```
