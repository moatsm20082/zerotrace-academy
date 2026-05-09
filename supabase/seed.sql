-- ZeroTrace Seed Data
-- Run after schema.

insert into public.labs (title, category, difficulty, points, description, objective, defensive_lesson, flag_plaintext, is_published)
values
('Login Logic Leak','Web','Easy',100,'Find the weak login assumption in a mock request.','Identify the auth mistake and submit the correct flag.','Use server-side auth validation and never trust client-controlled role claims.','ZT{client_trust_is_not_auth}',true),
('Triple Wrapped','Crypto','Easy',130,'A message is encoded multiple times and called secure.','Reverse the encoding layers.','Encoding is not encryption. Use real cryptographic controls.','ZT{encoding_is_not_encryption}',true),
('Beacon Hunter','Network','Medium',300,'Analyze flow summaries to identify repeated outbound beaconing.','Find the suspicious destination and submit the flag.','Baseline network behavior and alert on periodic unusual outbound traffic.','ZT{beacon_detected}',true),
('Access Timeline','Forensics','Hard',420,'Correlate failed and successful access events.','Identify the suspicious host, user, and port.','Alert on failed login clusters followed by a successful login.','ZT{ws17_admin_443}',true),
('Backwards String','Reverse','Easy',160,'A mock binary contains a reversed string.','Find the suspicious string and reverse it.','Static inspection can reveal useful indicators.','ZT{strings_before_debuggers}',true);

insert into public.tournaments (title, status, prize)
values ('ZeroTrace Weekly Cup #1','published','Winner chooses cash, device, or Pro access');
