import math
import cadquery as cq

def Tank(Radius,Thickness,BaseThickness,Height):
     Tank = cq.Workplane("front").circle(Radius+Thickness).extrude(BaseThickness)\
                .workplane().circle(Radius+Thickness).circle(Radius).extrude(Height)
     return Tank
    #result = result.extrude(BaseThickness)
    
def dishedbottom(Radius,Tank_height,Thickness):
    d=Radius*2
    offset=Thickness
    Ti=d-math.sqrt(3)*d/2
    dished=cq.Workplane("XZ").line(0,-Ti,forConstruction=1).radiusArc((-d/2-offset,0),d).line(0,offset).radiusArc((0,-Ti+offset),-d).close().revolve(clean=True)
    hull=cq.Workplane("XY").transformed(offset=(0,0,offset-1)).circle((d/2)+offset).circle(d/2).extrude(Tank_height,clean=False)
    tank=hull.union(dished,clean=0)
    return tank

def dishedtank(Volume,H_D,Thickness):
    Totalvol=10/8*Volume*pow(10,6)
    R=math.pow(24*Totalvol/(5*math.pi),1/3)/2
    Height=H_D*(R*2)
    tank=dishedbottom(R,Height,Thickness)
    return tank

def Shaft(center,ShaftDiameter,Height):
    Shaft = cq.Workplane("front").workplane(offset=center).circle(ShaftDiameter/2).extrude(3/4*Height)
    return Shaft

def Baffles(Baffle_count,Radius,BaffleLen,BaffleWid,Height):
    Baffles=cq.Workplane("XY")
    for i in range(Baffle_count):
        Baffle = cq.Workplane("XY").center(0,(Radius-BaffleLen/2)).rect(BaffleWid,BaffleLen)\
        .extrude(Height,clean=False).rotate((0,0,0),(0,0,1),(360/Baffle_count)*i)
        Baffles=Baffles.union(Baffle,clean=0)
    return Baffles

def Pitchblade(shaftdia,hubdia,bladelen,hubheight,blade_angle,bladet,bladeh,blade_count):
    theight=bladet/math.cos(math.degrees(45))
    points=[
            (-bladet/2,(hubheight/2-bladeh/2)),
            (bladet/2,((hubheight/2)-bladeh/2)-theight),
            (bladet/2,((hubheight/2)+bladeh/2)),
            (-bladet/2,((hubheight/2)+bladeh/2)+theight),
            ]
    hub=cq.Workplane("XY").circle(hubdia/2).circle(shaftdia/2).extrude(hubheight)
    blade=cq.Workplane()
    for i in range(blade_count):
        b=cq.Workplane("XZ").transformed(offset=(0,0,hubdia/2-(0.5*(hubdia-shaftdia))))\
                .polyline(points).close().extrude((bladelen/2+(0.5*(hubdia-shaftdia))))\
                .rotate((0,-hubdia-bladelen/2,hubheight/2),(0,-hubdia,hubheight/2),blade_angle)\
                .rotate((0,0,0),(0,0,1),(360/blade_count)*i)
        blade=blade.union(b)
    imp=hub.union(blade)
    return imp

def Rushtonblade(shaftdia,hubdia,bladelen,hubheight,bladet,bladeh,blade_count):
    hub=cq.Workplane("XY").circle(hubdia/2).circle(shaftdia/2).extrude(hubheight)
    blade=cq.Workplane()
    for i in range(blade_count):
        b=cq.Workplane("XY").transformed(offset=(hubdia-5,0,hubheight/2)).box(bladelen+5,bladet,bladeh,centered=(0,1,1))\
        .faces(">X").edges("|Y").fillet(4)\
        .faces("<X").edges("|Y").fillet(1)\
        .rotate((0,0,0),(0,0,1),(360/blade_count)*i)
        blade=blade.union(b)
    imp=hub.union(blade)
    return imp