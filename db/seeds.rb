require 'faker'

RaceParticipant.delete_all
Race.delete_all
User.delete_all

users = 10.times.map do
  User.create!(name: Faker::Name.name)
end

puts "Created #{User.count} users."

completed_positions = {
  2 => [1, 2],
  3 => [1, 2, 3],
  4 => [1, 2, 2, 4],
  5 => [1, 1, 3, 4, 5],
  6 => [1, 2, 2, 4, 5, 6],
  7 => [1, 2, 3, 4, 5, 6, 7],
  8 => [1, 2, 2, 4, 5, 6, 7, 7],
  9 => [1, 2, 3, 4, 5, 6, 7, 8, 9],
  10 => [1, 2, 2, 4, 5, 6, 6, 8, 9, 10]
}

races_names_options = [
  "The High School Dash",
  "The Championship Sprint",
  "The Relay Challenge",
  "The Schoolyard Sprint",
  "The Student Stride",
  "The Academic Run",
  "The Spirit Sprint",
  "The Victory Dash",
  "The Scholar Sprint",
  "The Athletic Challenge",
  "The Schoolyard Stride",
]

3.times do |i|
  num_participants = rand(2..10)

  race = Race.create!(
    status: 'completed',
    title: races_names_options.sample,
    start_date: Faker::Date.backward(days: 30)  # Past date
  )
  puts "Created Completed Race #{race.id} with status: #{race.status} and #{num_participants} participants"

  selected_users = users.sample(num_participants)

  positions = completed_positions[num_participants] || (1..num_participants).to_a

  selected_users.each_with_index do |user, index|
    RaceParticipant.create!(
      race: race,
      user: user,
      lane: index + 1,
      position: positions[index]
    )
  end

  puts "  -> Added #{num_participants} participants with positions: #{positions.join(', ')}"
end

4.times do |i|
  race = Race.create!(
    status: 'pending',
    title: races_names_options.sample,
    start_date: Faker::Date.forward(days: 30)
  )
  puts "Created Pending Race #{race.id} with status: #{race.status}"

  num_participants = rand(2..10)
  selected_users = users.sample(num_participants)

  selected_users.each_with_index do |user, index|
    RaceParticipant.create!(
      race: race,
      user: user,
      lane: index + 1,
      position: nil
    )
  end

  puts "  -> Added #{selected_users.count} participants (positions not set)"
end

puts "Seed complete!"
