# MariaDB

<!-- toc -->

- [Commands](#commands)
  - [connection](#connection)
  - [backup](#backup)
- [Notes](#notes)


<!-- tocstop -->

## Commands

### Connection
Connection count
``` sql
SHOW STATUS WHERE variable_name = 'threads_connected';
```
Show query [info]
``` sql
SELECT info, progress, command, state, time, id, user, host, db 
FROM information_schema.processlist;
```

### Insert 
``` sql
INSERT INTO table (column1, column2) VALUES ('value1', 'value2');
```

### Backup
Export schema and data

with data
``` sql
mariadb-dump -h 127.0.0.1 -u backup -p<Password> <database> > schema-data.sql
```
no data
```
mariadb-dump -h 127.0.0.1 -u backup -p<Password> --no-date <database> > schema.sql
```

## Notes
