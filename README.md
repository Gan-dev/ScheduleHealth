# ScheduleHealth
Proyect on JavaScript, Mongoose, Mongo DB and somes api's


## Endpoints
### Auth, Register, Main  
:white_check_mark:

    On this enpoints the user can login and register

| HTTPS | URI PATH | DESCRIPTION | API |
|-------|------|-------------|-----|
| GET | `/` | Landing-Page |  |
| GET | ` /login` | Log in |  |
| POST | `/login`| auth login |  |
| GET | ` /register`| form register |  |
| POST | `/register `| create User | |
| GET | ` /profile `| View profile |  |

### Users

| HTTPS | URI PATH | DESCRIPTION | API |
|-------|------|-------------|-----|
| GET | `/edit/{id}/profile` | render profile y preferences  |  |
| POST | `/edit/{id}/profile`| edit profile |  |
| GET | `/howYouFell` | render profile y preferences  |  |
| POST | `/howYouFell` | Input how to fell today |  |
| GET | `/{id}/myPage` | main page with calendar, moods and news  |  |

### Events

| HTTPS | URI PATH | DESCRIPTION | API |
|-------|------|-------------|-----|
| GET	| ` /event-list` |	Public event list | |
| GET	| ` /subcribed-event` |subscribed events | | 
| GET	| ` /my-events` |	Users events | |
| GET	| ` /createvent` | form-create event | |
| POST | `/createvent`	| creat event | |
| GET	| `/edit/{id}/event` | edit event | |
| POST | `/edit/{id}/event` | edit event | |
| POST | `/delete/{id}/event` | delete event | |

### MOOD
| HTTPS | URI PATH | DESCRIPTION | API |
|-------|------|-------------|-----|
| GET | `/feeling-form` | allows to reporte you feeling | |	
| GET | `/api/api.goprogram.ai/inspiration` | view of the calendar | :white_check_mark: |

### NEWS
| HTTPS | URI PATH | DESCRIPTION | API |
|-------|------|-------------|-----|
| GET | ` /news`| view random news | |
| GET | ` /{id}/newsdateils` | access to read the selected article	 | |
| GET | ` /api/theguardian` | news list | :white_check_mark:  |
| GET | ` /api/{id}/theguardian` | news details | :white_check_mark:  |
| GET | ` /api/googlecalendar` | view of the calendar | :white_check_mark: |
| GET | ` /api/getevents` | view events | :white_check_mark:  |


## Functions on The web-Site
- [ ] User registration and administrator profile
- [ ] Create public and private events in calendar
- [ ] Type of events, leisure, work health
- [ ] Record daily mood from a list and put a comment
- [ ] Chart with record of moods
- [ ] Filtering by type of events, leisure, work, health
- [ ] See list of public events for me and other users
- [ ] See profile with your next events, see news with theme preferences
- [ ] when the chart is low load motivational phrase. When I get high, another type of phrase
- [ ] tomorrow event alert (UTILS)

