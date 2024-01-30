#pragma once

#include <iostream>

#define LOG_INFO(logformatmsg, ...)                       \
    do                                                    \
    {                                                     \
        PVZLogger &loger = PVZLogger::get_instance();     \
        loger.set_log_level(PVZLogger::LogLevel::Info);              \
        char msg[1024];                                   \
        snprintf(msg, 1024, logformatmsg, ##__VA_ARGS__); \
        loger.log(msg);                                   \
    } while (0);

#define LOG_ERROR(logformatmsg, ...)                      \
    do                                                    \
    {                                                     \
        PVZLogger &loger = PVZLogger::get_instance();     \
        loger.set_log_level(PVZLogger::LogLevel::Error);             \
        char msg[1024];                                   \
        snprintf(msg, 1024, logformatmsg, ##__VA_ARGS__); \
        loger.log(msg);                                   \
    } while (0);

class PVZLogger
{
public:
    enum LogLevel
    {
        Info,
        Error
    };
    void set_log_level(LogLevel level);
    void log(std::string msg);

    static PVZLogger &get_instance();

private:
    PVZLogger(/* args */);
    ~PVZLogger();
    PVZLogger(const PVZLogger &) = delete;
    LogLevel loglevel;
};
