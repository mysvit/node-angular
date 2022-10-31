# MariaDB

<!-- toc -->

- [Commands](#commands)
  - [Connection](#connection)
  - [Insert](#insert)
  - [Foreign Keys](#foreign-keys)
  - [Backup](#backup)
- [Notes](#notes)


<!-- tocstop -->

## Commands

### Connection
Connection count
``` sql
SHOW STATUS WHERE variable_name = 'threads_connected'
```
Show query [info]
``` sql
SELECT info, progress, command, state, time, id, user, host, db 
FROM information_schema.processlist
```

### Insert 
``` sql
INSERT INTO table (column1, column2) VALUES ('value1', 'value2');
```
### Primary key

```sql
ALTER TABLE Table1 ADD PRIMARY KEY(ID);
```

### Foreign Keys
``` sql
CREATE TABLE table1 (
    table1_id INT,
    table2_ref_id INT,
    PRIMARY KEY (table1_id)
) ENGINE=InnoDB;

CREATE TABLE table2 (
    table2_id INT,
    content BLOB,
    PRIMARY KEY (table2_id)
) ENGINE=InnoDB;

ALTER TABLE table1
ADD CONSTRAINT constraint_name_ref FOREIGN KEY (table1_ref_id)
    REFERENCES table2 (table2_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;
    
ALTER TABLE table
DROP CONSTRAINT fk_constraint_name;
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
