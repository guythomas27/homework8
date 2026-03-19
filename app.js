console.log('Hello World!');

const name = 'Guy Cordell';
let hasDownloadedResume = false;
let downloadCount = 0;

function showGreeting(personName)
{
    return 'Hello, my name is ' + personName + '! Welcome to my portfolio!';
}

function daysUntilDeadline(deadlineDate)
{
    const currentDate = new Date();
    const futureDate = new Date(deadlineDate);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = futureDate - currentDate;

    return Math.ceil(timeDifference / millisecondsPerDay);
}

function getSavedSkills()
{
    const savedSkills = localStorage.getItem('skillsList');

    if (savedSkills)
    {
        return JSON.parse(savedSkills);
    }

    return [];
}

function saveSkills(skills)
{
    localStorage.setItem('skillsList', JSON.stringify(skills));
}

document.addEventListener('DOMContentLoaded', function ()
{
    const greetingElement = document.getElementById('greetingMessage');
    const deadlineText = document.getElementById('deadlineDays');
    const downloadCountText = document.getElementById('downloadCount');
    const skillInput = document.getElementById('skillInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillsList = document.getElementById('skillsList');
    const educationTableBody = document.getElementById('educationTableBody');
    const experienceTableBody = document.getElementById('experienceTableBody');

    const resumeButtons =
    [
        document.getElementById('resumeButtonTop'),
        document.getElementById('resumeButtonFooter')
    ];

    const projectDeadline = '2026-12-09';
    const remainingDays = daysUntilDeadline(projectDeadline);

    const savedDownloadCount = localStorage.getItem('downloadCount');

    if (savedDownloadCount !== null)
    {
        downloadCount = parseInt(savedDownloadCount, 10);
    }

    if (greetingElement)
    {
        greetingElement.textContent = showGreeting(name);
    }

    if (deadlineText)
    {
        deadlineText.textContent = remainingDays;
    }

    if (downloadCountText)
    {
        downloadCountText.textContent = downloadCount;
    }

    if (skillsList)
    {
        const savedSkills = getSavedSkills();

        const existingSkills = [];
        const listItems = skillsList.querySelectorAll('li');

        for (let i = 0; i < listItems.length; i++)
        {
            existingSkills.push(listItems[i].textContent);
        }

        for (let i = 0; i < savedSkills.length; i++)
        {
            if (!existingSkills.includes(savedSkills[i]))
            {
                const savedSkillItem = document.createElement('li');
                savedSkillItem.textContent = savedSkills[i];
                
                skillsList.appendChild(savedSkillItem);
            }
        }
    }

    console.log('Days until deadline:', remainingDays);

    resumeButtons.forEach(function (button)
    {
        if (button)
        {
            button.addEventListener('click', function ()
            {
                downloadCount++;
                localStorage.setItem('downloadCount', downloadCount);

                if (downloadCountText)
                {
                    downloadCountText.textContent = downloadCount;
                }

                if (!hasDownloadedResume)
                {
                    alert('Your resume is downloaded successfully!');
                    hasDownloadedResume = true;
                }
            });
        }
    });

    if (addSkillBtn && skillInput && skillsList)
    {
        addSkillBtn.addEventListener('click', function ()
        {
            const skill = skillInput.value.trim();

            if (skill !== '')
            {
                const currentSkills = getSavedSkills();

                if (!currentSkills.includes(skill))
                {
                    currentSkills.push(skill);
                    saveSkills(currentSkills);

                    const newSkill = document.createElement('li');

                    newSkill.textContent = skill;
                    skillsList.appendChild(newSkill);
                }

                skillInput.value = '';
            }
        });
    }

    const projectDeadlines =
    [
        '2025-01-01',
        '2025-06-01',
        '2025-10-01',
        '2026-12-09'
    ];

    const projectStatuses = document.querySelectorAll('.projectStatus');

    for (let i = 0; i < projectStatuses.length && i < projectDeadlines.length; i++)
    {
        const today = new Date();

        const deadline = new Date(projectDeadlines[i]);

        if (deadline > today)
        {
            projectStatuses[i].textContent = 'Ongoing';
        }

        else if (deadline < today)
        {
            projectStatuses[i].textContent = 'Completed';
        }

        else
        {
            projectStatuses[i].textContent = 'Due Today';
        }
    }

    const educationData =
    [
        ['Kingman High School', 'General Ed.', 'General Ed.'],
        ['Northern Arziona University', 'Computer Sciences', 'Bachelor\'s Degree']
    ];

    const experienceData =
    [
        ['TGen', 'Intern Programmer', '3/4 years'],
        ['Google Inc.', 'Intern Software Programmer', 'Current']
    ];

    if (educationTableBody)
    {
        educationTableBody.innerHTML = '';

        for (let i = 0; i < educationData.length; i++)
        {
            const row = document.createElement('tr');

            for (let j = 0; j < educationData[i].length; j++)
            {
                const cell = document.createElement('td');
                cell.textContent = educationData[i][j];

                row.appendChild(cell);
            }

            educationTableBody.appendChild(row);
        }
    }

    if (experienceTableBody)
    {
        experienceTableBody.innerHTML = '';

        for (let i = 0; i < experienceData.length; i++)
        {
            const row = document.createElement('tr');

            for (let j = 0; j < experienceData[i].length; j++)
            {
                const cell = document.createElement('td');
                cell.textContent = experienceData[i][j];
                
                row.appendChild(cell);
            }

            experienceTableBody.appendChild(row);
        }
    }
});
