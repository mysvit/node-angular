import { ISimple } from '@dto/dto.js'
import { createPool } from 'mariadb'

export async function simpleTbl(): Promise<ISimple> {
  const pool = createPool({
    host: 'wreason-db',
    database: 'whatreasondb',
    user: 'root',
    password: 'root',
    connectionLimit: 5
  })
  let conn
  try {
    conn = await pool.getConnection()
    return await conn.query('SELECT * FROM question')
  } catch (err) {
    throw err
  } finally {
      if (conn) await conn.release()
  }
}

export async function simpleAsync() {
  const pool = createPool({
    host: '127.0.0.1',
    database: 'nashoya',
    user: 'admin',
    password: 'qweasd',
    connectionLimit: 5
  })
  let conn
  try {
    conn = await pool.getConnection()
    return await conn.query('SELECT * FROM question')
    // console.log(q)
    // q.forEach(item => console.log(item))
// console.log(q.meta);
//         const a = await conn.query(`
// SELECT a.answer_id, qa.question_id, a.answer_name
// FROM
//   answer a,
//   question_answer qa
// WHERE
//   qa.question_id = ${q[0].question_id}
//   AND a.answer_id = qa.answer_id
//         `);
    //console.log(a);
    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    // return q
  } catch (err) {
    throw err
  } finally {
    if (conn) await conn.release() // or conn.end()
  }
}

