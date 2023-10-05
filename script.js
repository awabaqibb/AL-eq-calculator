const gradeValues = {
  "A*": 94,
  A: 85,
  B: 75,
  C: 65,
  D: 55,
  E: 45,
};

// Define an array of subject names
const subjects = ["Optional#1", "Optional#2", "Optional#3"];

// Function to generate radio buttons for subjects
function generateSubjectRadios() {
  const subjectRadios = document.getElementById("subjectRadios");

  subjects.forEach((subject, index) => {
    const div = document.createElement("div");
    div.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = `${subject} Grade :`;

    const gradeOptions = document.createElement("div");
    gradeOptions.classList.add("grade-options");

    const grades = Object.keys(gradeValues);
    grades.forEach((grade) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `subject${index + 1}`;
      input.value = gradeValues[grade];
      input.id = `subject${index + 1}-${grade}`;

      const gradeLabel = document.createElement("label");
      gradeLabel.textContent = grade;
      gradeLabel.setAttribute("for", `subject${index + 1}-${grade}`);

      gradeOptions.appendChild(input);
      gradeOptions.appendChild(gradeLabel);
    });

    div.appendChild(label);
    div.appendChild(gradeOptions);
    subjectRadios.appendChild(div);
  });
}

// Call the function to generate radio buttons
generateSubjectRadios();

// Function to calculate the total grade
function calculateGrades() {
  const totalGradeSpan = document.getElementById("totalGrade");
  const percentageSpan = document.getElementById("percentage");

  const subjectValues = [];

  // Collect the selected grades for all subjects
  subjects.forEach((subject, index) => {
    const selectedGrade = document.querySelector(
      `input[name="subject${index + 1}"]:checked`
    );
    if (!selectedGrade) {
      alert(`Please select a grade for ${subject}.`);
      return; // Exit if any subject is not selected
    }

    const grade = parseInt(selectedGrade.value);
    subjectValues.push(grade);
  });

  // Get the total marks entered by the user
  const totalMarksInput = document.getElementById("totalMarks");
  const totalMarks = parseInt(totalMarksInput.value) || 0; // Default to 0 if input is empty or not a number

  // Calculate the sum of grades
  const sumOfGrades = subjectValues.reduce((acc, value) => acc + value, 0);

  // Calculate the total grade out of 1100 (800 marks + 300 grades)
  const totalGrade = sumOfGrades + totalMarks;

  // Calculate the percentage
  const percentage = (totalGrade / 1100) * 100;

  // Display the results
  totalGradeSpan.textContent = totalGrade;
  percentageSpan.textContent = percentage.toFixed(2); // Display percentage with 2 decimal places
}

// Attach the calculateGrades function to the button click event
const calculateButton = document.querySelector("button");
calculateButton.addEventListener("click", calculateGrades);
