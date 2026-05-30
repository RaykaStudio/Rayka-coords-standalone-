local isUIOpen = false

RegisterNetEvent('rayka-coords:openUI')
AddEventHandler('rayka-coords:openUI', function()
    if isUIOpen then return end
    
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed)
    local heading = GetEntityHeading(playerPed)

    local x = string.format("%.2f", coords.x)
    local y = string.format("%.2f", coords.y)
    local z = string.format("%.2f", coords.z)
    local h = string.format("%.2f", heading)

    isUIOpen = true
    SetNuiFocus(true, true)

    SendNUIMessage({
        action = "open",
        xyz = string.format("%s, %s, %s", x, y, z),
        vector3 = string.format("vector3(%s, %s, %s)", x, y, z),
        vector4 = string.format("vector4(%s, %s, %s, %s)", x, y, z, h)
    })
end)

RegisterNUICallback('closeUI', function(data, cb)
    SetNuiFocus(false, false)
    isUIOpen = false
    cb('ok')
end)