# Data Model

This defines the core entities and their relationships in the Zure Speakers & Sessions system.

## Entities

### Speaker

Represents an individual speaker from Zure who delivers sessions.

Attributes: name (Speaker's full name), bio (Biography and background information), photo (Profile photo URL or image data), title (Professional title or role at Zure)

### Session

Represents a talk, workshop, or presentation that can be delivered at events.

Attributes: title (Session title), abstract (Detailed description of the session content)

## Relationships

- Speaker has many Sessions
- Session has many Speakers
- Speaker can co-present Sessions with other Speakers
