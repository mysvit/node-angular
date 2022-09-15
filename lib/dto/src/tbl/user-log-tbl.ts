export interface UserLogTbl {
    user_log_id: bigint,
    user_id: string,
    write_date: Date,
    host_ip: string,
    log_type_id: number,
    log_desc: string
}
