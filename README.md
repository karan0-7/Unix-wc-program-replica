# Unix-wc-program-replica

This is a node program which replicates the Unix program that is wc which when given a file path, outputs information such as the total bytes of the file, number of lines, words and many others.
The program should be executed in the following format:

**Execution syntax:** node main.js <file_name> <option_1> <options_2> ...

The acceptable values for options are:

**-m:** total characters 

**-c:** total bytes

**-l:** total new lines

**-w:** total words

If an invalid option is provided then a log will be shown displaying the first invalid option with a list of the correct options.

If no options are provided, then all 4 values will be displayed.
If invalid file path is provided then an error will be thrown regarding the same.

The function execution time is also provided.

I would highly appreciate valuable feedback.
Thank you.
