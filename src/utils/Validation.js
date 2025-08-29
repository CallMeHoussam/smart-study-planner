export const validateTask = (task) => {
  const errors = {};

  if (!task.title || task.title.trim().length === 0) {
    errors.title = "Task title is required";
  } else if (task.title.trim().length < 3) {
    errors.title = "Task title must be at least 3 characters";
  }

  if (task.focusHours && (isNaN(task.focusHours) || task.focusHours < 0)) {
    errors.focusHours = "Focus hours must be a positive number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProfile = (profile) => {
  const errors = {};

  if (!profile.name || profile.name.trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!profile.goal || profile.goal.trim().length === 0) {
    errors.goal = "Study goal is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};