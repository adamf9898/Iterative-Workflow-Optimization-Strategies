# Iterative Tasks Methodology

## Overview

Iterative tasks are the fundamental building blocks of workflow optimization. This methodology breaks complex work into small, manageable increments that deliver value progressively while enabling continuous feedback and adjustment.

## Core Concepts

### What is an Iterative Task?

An iterative task is a work unit that:
- Has a clear, specific objective
- Can be completed within a defined timeframe (hours to days)
- Produces a measurable outcome
- Provides learning that informs subsequent tasks
- Can be adjusted based on feedback

### The Iteration Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│                    ITERATION CYCLE                      │
│                                                         │
│  Plan → Execute → Review → Reflect → Adjust → [Repeat] │
│    ↑                                             ↓      │
│    └─────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

## Planning Iterative Tasks

### 1. Task Decomposition

Break down large objectives into smaller tasks using these criteria:

#### Size Guidelines
- **Micro-tasks**: 1-2 hours (individual activities)
- **Small tasks**: 2-8 hours (single deliverable)
- **Medium tasks**: 1-3 days (feature or component)
- **Large tasks**: 3-5 days (complex feature, requires further breakdown)

#### Decomposition Techniques
- **Functional**: By feature or capability
- **Technical**: By technology layer or component
- **Sequential**: By workflow steps
- **Risk-based**: By uncertainty or complexity

### 2. Task Definition

Each task should have:

**Clear Objective**
- What will be accomplished?
- Why is it important?
- How does it contribute to the larger goal?

**Acceptance Criteria**
- Specific, measurable conditions for completion
- Quality standards
- Definition of done

**Dependencies**
- Prerequisites that must be completed first
- External dependencies or blockers
- Required resources

**Estimated Effort**
- Time estimate (with confidence level)
- Required skills or expertise
- Resource allocation

### 3. Prioritization

Use these factors to prioritize tasks:

1. **Value**: Business or customer impact
2. **Risk**: Technical or business risk reduction
3. **Dependencies**: Unblocking other work
4. **Learning**: Knowledge acquisition
5. **Urgency**: Time constraints

#### Prioritization Matrix

```
High Value, Low Effort  →  Do First
High Value, High Effort →  Plan Carefully
Low Value, Low Effort   →  Do Later
Low Value, High Effort  →  Avoid/Defer
```

## Executing Iterative Tasks

### 1. Daily Workflow

**Morning**
- Review task objectives and acceptance criteria
- Confirm dependencies are met
- Set up work environment
- Plan the day's activities

**During Work**
- Focus on one task at a time
- Document progress and decisions
- Identify and log blockers immediately
- Take regular breaks for perspective

**End of Day**
- Update task status
- Document what was accomplished
- Note any blockers or questions
- Plan next day's work

### 2. Task Tracking

Track these attributes for each task:

- **Status**: Not Started, In Progress, Blocked, Review, Done
- **Progress**: Percentage complete or story points
- **Time**: Actual vs. estimated time
- **Blockers**: Current impediments
- **Notes**: Key decisions and learnings

### 3. Handling Blockers

When blocked:
1. Document the blocker clearly
2. Identify who can help resolve it
3. Communicate the blocker immediately
4. Work on alternate tasks while waiting
5. Follow up regularly on blocker resolution

## Reviewing Iterative Tasks

### 1. Task Review Checklist

- [ ] Acceptance criteria met?
- [ ] Quality standards achieved?
- [ ] Documentation complete?
- [ ] Tests passing (if applicable)?
- [ ] No known defects?
- [ ] Stakeholder feedback incorporated?

### 2. Peer Review

Benefits:
- Knowledge sharing
- Quality improvement
- Skill development
- Team collaboration

Process:
1. Author prepares work for review
2. Reviewer examines completeness and quality
3. Feedback provided constructively
4. Issues addressed
5. Approval given

### 3. Stakeholder Review

When to involve stakeholders:
- Task affects user experience
- Significant architectural decisions
- Cross-team dependencies
- Risk or cost implications

## Reflecting on Iterations

### 1. Individual Reflection

After each task or iteration, consider:

**What went well?**
- Techniques or approaches that worked
- Efficient problem-solving
- Productive collaborations

**What could be improved?**
- Challenges encountered
- Inefficiencies or waste
- Skills to develop

**What did I learn?**
- Technical knowledge gained
- Process insights
- Team dynamics

### 2. Team Retrospective

Regular team retrospectives (weekly or bi-weekly):

**Format**
1. Gather data (15 min): What happened during the iteration?
2. Generate insights (15 min): Why did things happen?
3. Decide actions (15 min): What will we change?
4. Close (5 min): Appreciation and summary

**Key Questions**
- What should we start doing?
- What should we stop doing?
- What should we continue doing?

## Adjusting Based on Feedback

### 1. Adaptation Triggers

Adjust your approach when:
- Tasks consistently take longer than estimated
- Quality issues are recurring
- Team morale is low
- Velocity is declining
- Stakeholder satisfaction drops

### 2. Adjustment Types

**Process Adjustments**
- Change iteration length
- Modify team size or composition
- Adjust review frequency
- Update communication channels

**Task Adjustments**
- Refine decomposition strategy
- Adjust estimation approach
- Revise prioritization criteria
- Update definition of done

**Tool Adjustments**
- Adopt new collaboration tools
- Implement automation
- Update tracking systems
- Enhance documentation

## Best Practices

### DO
✓ Keep iterations short and focused
✓ Deliver value incrementally
✓ Embrace feedback and adapt quickly
✓ Document learnings and decisions
✓ Celebrate small wins
✓ Maintain sustainable pace

### DON'T
✗ Over-plan future iterations
✗ Skip retrospectives
✗ Ignore persistent blockers
✗ Work in isolation
✗ Sacrifice quality for speed
✗ Resist necessary changes

## Metrics for Iterative Tasks

### Effectiveness Metrics
- **Completion Rate**: Tasks completed vs. planned
- **Cycle Time**: Time from start to completion
- **Velocity**: Story points or tasks per iteration
- **Quality**: Defect rate, rework percentage

### Efficiency Metrics
- **Estimation Accuracy**: Actual vs. estimated time
- **Blocker Frequency**: Number and duration of blockers
- **Utilization**: Productive time vs. total time
- **Throughput**: Tasks completed per time period

### Learning Metrics
- **Knowledge Sharing**: Documentation created, training sessions
- **Skill Development**: New capabilities acquired
- **Innovation**: New approaches tried
- **Collaboration**: Cross-team interactions

## Templates and Tools

See the [templates/](../templates/) directory for:
- Task iteration planning template
- Daily task tracking template
- Retrospective facilitation guide
- Metrics dashboard template

## Examples

Explore [examples/](../examples/) for:
- Software development iteration examples
- Project management task breakdowns
- Team retrospective summaries
