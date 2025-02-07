require 'faker'

# Clear existing data (optional)
RaceParticipant.delete_all
Race.delete_all
User.delete_all

# Create 10 users with fake names
users = 10.times.map do
  User.create!(name: Faker::Name.name)
end

puts "Created #{User.count} users."

# ------------------------------
# Group A: 3 Completed Races (Past Races)
# ------------------------------
# Define a mapping from number of participants to a specific positions array.
# You can customize these arrays as needed.
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

3.times do |i|
  # Determine a random number of participants (between 2 and 10) for this race.
  num_participants = rand(2..10)

  race = Race.create!(
    status: 'completed',
    title: Faker::University.name,
    start_date: Faker::Date.backward(days: 30)  # Past date
  )
  puts "Created Completed Race #{race.id} with status: #{race.status} and #{num_participants} participants"

  # Select exactly num_participants distinct users for this race.
  selected_users = users.sample(num_participants)

  # Look up the positions array from our mapping. If not defined, default to a simple range.
  positions = completed_positions[num_participants] || (1..num_participants).to_a

  # Create race participants with sequential lanes.
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

# ------------------------------
# Group B: 4 Pending Races (Future Races)
# ------------------------------
4.times do |i|
  race = Race.create!(
    status: 'pending',
    title: Faker::University.name,
    start_date: Faker::Date.forward(days: 30)  # Future date
  )
  puts "Created Pending Race #{race.id} with status: #{race.status}"

  # Choose a random number of participants (between 2 and 10)
  num_participants = rand(2..10)
  selected_users = users.sample(num_participants)

  selected_users.each_with_index do |user, index|
    RaceParticipant.create!(
      race: race,
      user: user,
      lane: index + 1,
      position: nil   # No positions for pending races
    )
  end

  puts "  -> Added #{selected_users.count} participants (positions not set)"
end

puts "Seed complete!"
